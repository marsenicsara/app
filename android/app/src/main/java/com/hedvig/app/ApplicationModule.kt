package com.hedvig.app

import android.app.Application
import android.content.Context
import com.apollographql.apollo.Logger
import com.google.android.exoplayer2.upstream.cache.LeastRecentlyUsedCacheEvictor
import com.google.android.exoplayer2.upstream.cache.SimpleCache
import com.hedvig.android.owldroid.util.react.AsyncStorageNativeReader
import dagger.Module
import dagger.Provides
import okhttp3.logging.HttpLoggingInterceptor
import java.io.File
import javax.inject.Named

@Module
object ApplicationModule {
    @Provides
    @JvmStatic
    fun application(application: MainApplication): Application {
        return application
    }

    @Provides
    @JvmStatic
    fun context(application: Application): Context {
        return application.baseContext
    }

    @Provides
    @JvmStatic
    internal fun simpleCache(context: Context): SimpleCache {
        return SimpleCache(
            File(context.cacheDir, "hedvig_story_video_cache"),
            LeastRecentlyUsedCacheEvictor((10 * 1024 * 1024).toLong())
        )
    }

    @Provides
    @JvmStatic
    fun asyncStorageNativeReader(context: Context): AsyncStorageNativeReader {
        return AsyncStorageNativeReaderImpl(context)
    }

    @Provides
    @JvmStatic
    @Named("GRAPHQL_URL")
    fun graphqlUrl(): String {
        return BuildConfig.GRAPHQL_URL
    }

    @Provides
    @JvmStatic
    @Named("VERSION_NUMBER")
    fun versionNumber(): String {
        return BuildConfig.VERSION_NAME
    }

    @Provides
    @JvmStatic
    @Named("APPLICATION_ID")
    fun applicationId(): String {
        return BuildConfig.APPLICATION_ID
    }

    @Provides
    @JvmStatic
    @Named("BASE_URL")
    fun baseUrl(): String {
        return "https://graphql.dev.hedvigit.com"
    }

    @Provides
    @JvmStatic
    fun apolloLogger(): Logger? {
        return null
    }

    @Provides
    @JvmStatic
    fun httpLoggingInterceptor(): HttpLoggingInterceptor? {
        return null
    }
}
