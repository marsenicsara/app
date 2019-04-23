package com.hedvig.app;

import android.app.Application;
import android.content.Context;
import com.apollographql.apollo.Logger;
import com.google.android.exoplayer2.upstream.cache.LeastRecentlyUsedCacheEvictor;
import com.google.android.exoplayer2.upstream.cache.SimpleCache;
import com.hedvig.android.owldroid.util.react.AsyncStorageNativeReader;
import dagger.Module;
import dagger.Provides;
import okhttp3.logging.HttpLoggingInterceptor;

import javax.annotation.Nullable;
import javax.inject.Named;
import java.io.File;

@Module
public class ApplicationModule {
    @Provides
    static Application application(MainApplication application) {
        return application;
    }

    @Provides
    static Context context(Application application) {
        return application.getBaseContext();
    }

    @Provides
    static SimpleCache simpleCache(Context context) {
        return new SimpleCache(new File(context.getCacheDir(), "hedvig_story_video_cache"), new LeastRecentlyUsedCacheEvictor(10 * 1024 * 1024));
    }

    @Provides
    static AsyncStorageNativeReader asyncStorageNativeReader(Context context) {
        return new AsyncStorageNativeReaderImpl(context);
    }

    @Provides
    @Named("GRAPHQL_URL")
    static String graphqlUrl() {
        return BuildConfig.GRAPHQL_URL;
    }

    @Provides
    @Named("VERSION_NUMBER")
    static String versionNumber() {
        return BuildConfig.VERSION_NAME;
    }

    @Provides
    @Named("APPLICATION_ID")
    static String applicationId() {
        return BuildConfig.APPLICATION_ID;
    }

    @Provides
    @Named("BASE_URL")
    static String baseUrl() {
        return "https://graphql.dev.hedvigit.com";
    }

    @Provides
    @Nullable
    static Logger apolloLogger() {
        return null;
    }

    @Provides
    @Nullable
    static HttpLoggingInterceptor httpLoggingInterceptor() {
        return null;
    }
}
