package com.hedvig.app;

import com.hedvig.android.owldroid.service.PushNotificationService;
import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
abstract class ServiceContributorModule {
    @ContributesAndroidInjector
    abstract PushNotificationService contributePushNotificationService();
}
