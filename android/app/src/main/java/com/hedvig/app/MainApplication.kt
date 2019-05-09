package com.hedvig.app

import android.app.Activity
import android.app.Application
import android.app.Service
import android.content.Context
import android.support.multidex.MultiDex
import android.support.v4.app.Fragment
import android.support.v7.app.AppCompatDelegate
import androidx.work.Configuration
import androidx.work.WorkManager
import androidx.work.WorkerFactory
import androidx.work.WorkerParameters
import com.RNFetchBlob.RNFetchBlobPackage
import com.airbnb.android.react.lottie.LottiePackage
import com.apollographql.apollo.ApolloClient
import com.brentvatne.react.ReactVideoPackage
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader
import com.hedvig.app.react.ActivityStarterReactPackage
import com.hedvig.app.service.PushNotificationWorker
import com.hedvig.app.util.react.AsyncStorageNative
import com.horcrux.svg.SvgPackage
import com.imagepicker.ImagePickerPackage
import com.jakewharton.threetenabp.AndroidThreeTen
import com.learnium.RNDeviceInfo.RNDeviceInfo
import com.leo_pharma.analytics.AnalyticsPackage
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage
import com.rnfs.RNFSPackage
import com.rnim.rn.audio.ReactNativeAudioPackage
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage
import com.zmxv.RNSound.RNSoundPackage
import dagger.android.DispatchingAndroidInjector
import dagger.android.HasActivityInjector
import dagger.android.HasServiceInjector
import dagger.android.support.HasSupportFragmentInjector
import io.branch.referral.Branch
import io.branch.rnbranch.RNBranchPackage
import io.invertase.firebase.RNFirebasePackage
import io.sentry.RNSentryPackage
import net.ypresto.timbertreeutils.CrashlyticsLogExceptionTree
import timber.log.Timber
import javax.inject.Inject

class MainApplication : Application(), ReactApplication, HasActivityInjector, HasSupportFragmentInjector,
    HasServiceInjector {

    @Inject
    lateinit var activityInjector: DispatchingAndroidInjector<Activity>

    @Inject
    lateinit var fragmentInjector: DispatchingAndroidInjector<Fragment>

    @Inject
    lateinit var serviceInjector: DispatchingAndroidInjector<Service>

    @Inject
    lateinit var apolloClient: ApolloClient

    @Inject
    lateinit var asyncStorageNative: AsyncStorageNative

    private val mReactNativeHost = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport() = BuildConfig.DEBUG

        override fun getPackages() = listOf(
            ActivityStarterReactPackage(apolloClient),
            MainReactPackage(),
            ImagePickerPackage(),
            RNFSPackage(),
            ReactVideoPackage(),
            RNGestureHandlerPackage(),
            RNDeviceInfo(),
            SvgPackage(),
            ReactNativeConfigPackage(),
            RNFetchBlobPackage(),
            RNSoundPackage(),
            RNSentryPackage(),
            RNBranchPackage(),
            RNFirebasePackage(),
            ReactNativeAudioPackage(),
            AnalyticsPackage(),
            LottiePackage(),
            NativeRoutingPackage(apolloClient)
        )

        override fun getJSMainModuleName() = "index.android"
    }

    override fun attachBaseContext(base: Context) {
        super.attachBaseContext(base)
        MultiDex.install(this)
    }

    override fun getReactNativeHost() = mReactNativeHost

    override fun onCreate() {
        super.onCreate()
        AndroidThreeTen.init(this)
        DaggerApplicationComponent
            .builder()
            .application(this)
            .build()
            .inject(this)
        Branch.getAutoInstance(this)
        SoLoader.init(this, false)
        // TODO Remove this probably? Or figure out a better solve for the problem
        if (BuildConfig.DEBUG || BuildConfig.APP_ID == "com.hedvig.test.app") {
            Timber.plant(Timber.DebugTree())
        } else {
            Timber.plant(CrashlyticsLogExceptionTree())
        }

        AppCompatDelegate.setCompatVectorFromResourcesEnabled(true)


        val workerFactory = object : WorkerFactory() {
            override fun createWorker(
                appContext: Context,
                workerClassName: String,
                workerParameters: WorkerParameters
            ) = PushNotificationWorker(appContext, workerParameters, apolloClient, asyncStorageNative)
        }
        WorkManager
            .initialize(this, Configuration.Builder().setWorkerFactory(workerFactory).build())
    }

    override fun activityInjector() = activityInjector
    override fun supportFragmentInjector() = fragmentInjector
    override fun serviceInjector() = serviceInjector
}