package com.hedvig.app;

import android.app.Application;
import android.content.Context;

import com.google.android.exoplayer2.upstream.cache.LeastRecentlyUsedCacheEvictor;
import com.google.android.exoplayer2.upstream.cache.SimpleCache;

import java.io.File;

import javax.inject.Named;
import javax.inject.Singleton;

import dagger.Module;
import dagger.Provides;

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
    @Named("GRAPHQL_URL")
    String graphqlUrl() {
        return BuildConfig.GRAPHQL_URL;
    }
}
