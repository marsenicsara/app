package com.hedvig.app.di

import android.app.Application
import android.content.Context
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.Logger
import com.apollographql.apollo.cache.normalized.NormalizedCacheFactory
import com.apollographql.apollo.cache.normalized.lru.EvictionPolicy
import com.apollographql.apollo.cache.normalized.lru.LruNormalizedCache
import com.apollographql.apollo.cache.normalized.lru.LruNormalizedCacheFactory
import com.google.android.exoplayer2.upstream.cache.LeastRecentlyUsedCacheEvictor
import com.google.android.exoplayer2.upstream.cache.SimpleCache
import com.google.firebase.analytics.FirebaseAnalytics
import com.hedvig.android.owldroid.type.CustomType
import com.hedvig.app.BuildConfig
import com.hedvig.app.MainApplication
import com.hedvig.app.util.apollo.ApolloTimberLogger
import com.hedvig.app.util.apollo.PromiscuousLocalDateAdapter
import com.hedvig.app.util.react.AsyncStorageNative
import com.hedvig.app.util.react.AsyncStorageNativeImpl
import dagger.Module
import dagger.Provides
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import timber.log.Timber
import java.io.File
import javax.inject.Named
import javax.inject.Singleton

@Module
object ApplicationModule {
    @Provides
    @JvmStatic
    fun application(application: MainApplication): Application = application

    @Provides
    @JvmStatic
    fun context(application: Application) = application.baseContext

    @Provides
    @JvmStatic
    fun firebaseAnalytics(context: Context) = FirebaseAnalytics.getInstance(context)

    @Provides
    @JvmStatic
    fun simpleCache(context: Context) = SimpleCache(
        File(context.cacheDir, "hedvig_story_video_cache"),
        LeastRecentlyUsedCacheEvictor((10 * 1024 * 1024).toLong())
    )

    @Provides
    @JvmStatic
    fun asyncStorageNativeReader(context: Context): AsyncStorageNative =
        AsyncStorageNativeImpl(context)


    @Provides
    @JvmStatic
    fun apolloLogger(): Logger? = if (BuildConfig.DEBUG || BuildConfig.APP_ID == "com.hedvig.test.app") {
        ApolloTimberLogger()
    } else {
        null
    }

    @Provides
    @JvmStatic
    fun httpLoggingInterceptor(): HttpLoggingInterceptor? =
        if (BuildConfig.DEBUG || BuildConfig.APP_ID == "com.hedvig.test.app") {
            HttpLoggingInterceptor(HttpLoggingInterceptor.Logger { message ->
                Timber.tag("OkHttp").i(message)
            }).setLevel(HttpLoggingInterceptor.Level.BODY)
        } else {
            null
        }

    @Provides
    @Singleton
    @JvmStatic
    fun okHttpClient(
        asyncStorageNative: AsyncStorageNative,
        httpLoggingInterceptor: HttpLoggingInterceptor?
    ): OkHttpClient {
        val builder = OkHttpClient.Builder()
            .addInterceptor { chain ->
                val original = chain.request()
                val builder = original
                    .newBuilder()
                    .method(original.method(), original.body())
                try {
                    asyncStorageNative.getKey("@hedvig:token")
                } catch (exception: Exception) {
                    Timber.e(exception, "Got an exception while trying to retrieve token")
                    null
                }?.let { token ->
                    builder.header("Authorization", token)
                }
                chain.proceed(builder.build())
            }
        httpLoggingInterceptor?.let { builder.addInterceptor(it) }
        return builder.build()
    }

    @Provides
    @Singleton
    @JvmStatic
    fun lruNormalizedCacheFactory(): NormalizedCacheFactory<LruNormalizedCache> {
        return LruNormalizedCacheFactory(EvictionPolicy.builder().maxSizeBytes(1000 * 1024).build())
    }

    @Provides
    @Singleton
    @JvmStatic
    fun apolloClient(
        okHttpClient: OkHttpClient,
        normalizedCacheFactory: NormalizedCacheFactory<LruNormalizedCache>,
        @Named("GRAPHQL_URL") graphqlUrl: String,
        logger: Logger?
    ): ApolloClient {
        val builder = ApolloClient
            .builder()
            .serverUrl(graphqlUrl)
            .okHttpClient(okHttpClient)
            .addCustomTypeAdapter(CustomType.LOCALDATE, PromiscuousLocalDateAdapter())
            .normalizedCache(normalizedCacheFactory)

        logger?.let { builder.logger(it) }

        return builder.build()
    }
}
