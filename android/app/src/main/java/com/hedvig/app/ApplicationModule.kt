package com.hedvig.app

import android.app.Application
import android.content.Context
import com.apollographql.apollo.Logger
import com.google.android.exoplayer2.upstream.cache.LeastRecentlyUsedCacheEvictor
import com.google.android.exoplayer2.upstream.cache.SimpleCache
import com.hedvig.android.owldroid.util.apollo.ApolloTimberLogger
import com.hedvig.android.owldroid.util.react.AsyncStorageNative
import dagger.Module
import dagger.Provides
import okhttp3.logging.HttpLoggingInterceptor
import timber.log.Timber
import java.io.File
import javax.inject.Named

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
    fun simpleCache(context: Context) = SimpleCache(
            File(context.cacheDir, "hedvig_story_video_cache"),
            LeastRecentlyUsedCacheEvictor((10 * 1024 * 1024).toLong())
        )

    @Provides
    @JvmStatic
    fun asyncStorageNativeReader(context: Context): AsyncStorageNative = AsyncStorageNativeImpl(context)

    @Provides
    @JvmStatic
    @Named("GRAPHQL_URL")
    fun graphqlUrl() = BuildConfig.GRAPHQL_URL

    @Provides
    @JvmStatic
    @Named("VERSION_NUMBER")
    fun versionNumber() = BuildConfig.VERSION_NAME

    @Provides
    @JvmStatic
    @Named("APPLICATION_ID")
    fun applicationId() = BuildConfig.APPLICATION_ID

    @Provides
    @JvmStatic
    @Named("BASE_URL")
    fun baseUrl() = BuildConfig.BASE_URL

    @Provides
    @JvmStatic
    fun apolloLogger(): Logger? = if (BuildConfig.DEBUG) {
        ApolloTimberLogger()
    } else {
        null
    }

    @Provides
    @JvmStatic
    fun httpLoggingInterceptor(): HttpLoggingInterceptor? = if (BuildConfig.DEBUG) {
        HttpLoggingInterceptor(HttpLoggingInterceptor.Logger { message ->
            Timber.tag("OkHttp").i(message)
        }).setLevel(HttpLoggingInterceptor.Level.BODY)
    } else {
        null
    }
}
