package com.hedvig.app;

import android.app.Application;
import android.content.Context;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.apollographql.apollo.ApolloClient;
import com.apollographql.apollo.Logger;
import com.apollographql.apollo.internal.ApolloLogger;
import com.brentvatne.react.ReactVideoPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;
import com.google.android.exoplayer2.upstream.cache.LeastRecentlyUsedCacheEvictor;
import com.google.android.exoplayer2.upstream.cache.SimpleCache;
import com.hedvig.android.owldroid.util.react.AsyncStorageNativeReader;
import com.hedvig.app.starter.ActivityStarterReactPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.leo_pharma.analytics.AnalyticsPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.rnfs.RNFSPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.zmxv.RNSound.RNSoundPackage;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;
import javax.inject.Named;
import javax.inject.Singleton;

import dagger.Module;
import dagger.Provides;
import io.branch.rnbranch.RNBranchPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.sentry.RNSentryPackage;
import okhttp3.logging.HttpLoggingInterceptor;

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
    @Nullable
    static Logger apolloLogger() {
        return null;
    }

    @Provides
    @Nullable
    static HttpLoggingInterceptor httpLoggingInterceptor() {
        return null;
    }

    @Provides
    @Singleton
    static ReactInstanceManager reactInstanceManager(MainApplication application, ApolloClient apolloClient) {
        return ReactInstanceManager
                .builder()
                .setApplication(application)
                .addPackages(getPackages(apolloClient))
                .setJSMainModulePath("androidtest")
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .setUseDeveloperSupport(true)
                .build();
    }

    static List<ReactPackage> getPackages(ApolloClient apolloClient) {
        return Arrays.asList(
                new ActivityStarterReactPackage(),
                new MainReactPackage(),
                new ReactNativeDocumentPicker(),
                new FastImageViewPackage(),
                new ImagePickerPackage(),
                new RNFSPackage(),
                new ReactVideoPackage(),
                new RNGestureHandlerPackage(),
                new RNDeviceInfo(),
                new SvgPackage(),
                new ReactNativeConfigPackage(),
                new RNFetchBlobPackage(),
                new RNSoundPackage(),
                new RNSentryPackage(),
                new RNFirebasePackage(),
                new RNFirebaseNotificationsPackage(),
                new RNFirebaseMessagingPackage(),
                new RNFirebaseAnalyticsPackage(),
                new RNBranchPackage(),
                new ReactNativeAudioPackage(),
                new AnalyticsPackage(),
                new LottiePackage(),
                new NativeRoutingPackage(apolloClient)
        );
    }
}
