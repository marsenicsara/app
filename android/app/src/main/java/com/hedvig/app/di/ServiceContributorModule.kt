package com.hedvig.app.di

import com.hedvig.app.service.PushNotificationService
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class ServiceContributorModule {
    @ContributesAndroidInjector
    abstract fun contributePushNotificationService(): PushNotificationService
}
