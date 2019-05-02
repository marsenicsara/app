package com.hedvig.app

import com.hedvig.android.owldroid.service.PushNotificationService
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
internal abstract class ServiceContributorModule {
    @ContributesAndroidInjector
    internal abstract fun contributePushNotificationService(): PushNotificationService
}
