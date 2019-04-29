package com.hedvig.app

import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class ActivityContributorModule {
    @ContributesAndroidInjector
    abstract fun contributeMainActivity(): MainActivity
}
