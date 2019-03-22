package com.hedvig.app;

import android.app.Application;
import android.content.Context;

import com.apollographql.apollo.Logger;
import com.apollographql.apollo.internal.ApolloLogger;
import com.google.android.exoplayer2.upstream.cache.LeastRecentlyUsedCacheEvictor;
import com.google.android.exoplayer2.upstream.cache.SimpleCache;
import com.hedvig.android.owldroid.util.react.AsyncStorageNativeReader;

import java.io.File;

import javax.annotation.Nullable;
import javax.inject.Named;
import javax.inject.Singleton;

import dagger.Module;
import dagger.Provides;
import okhttp3.logging.HttpLoggingInterceptor;

@Module
public class ApplicationModule {
    @Provides
    Application application(MainApplication application) {
        return application;
    }

    @Provides
    @Singleton
    Context context(Application application) {
        return application.getBaseContext();
    }

    @Provides
    @Singleton
    SimpleCache simpleCache(Context context) {
        return new SimpleCache(new File(context.getCacheDir(), "hedvig_story_video_cache"), new LeastRecentlyUsedCacheEvictor(10 * 1024 * 1024));
    }

    @Provides
    @Singleton
    AsyncStorageNativeReader asyncStorageNativeReader(Context context) {
        return new AsyncStorageNativeReaderImpl(context);
    }

    @Provides
    @Named("GRAPHQL_URL")
    String graphqlUrl() {
        return BuildConfig.GRAPHQL_URL;
    }

    @Provides
    @Nullable
    Logger apolloLogger() {
        return null;
    }

    @Provides
    @Nullable
    HttpLoggingInterceptor httpLoggingInterceptor() {
        return null;
    }
}
