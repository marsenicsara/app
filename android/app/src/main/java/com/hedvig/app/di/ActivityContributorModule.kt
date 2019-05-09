package com.hedvig.app.di

import com.hedvig.app.MainActivity
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class ActivityContributorModule {
    @ContributesAndroidInjector
    abstract fun contributeMainActivity(): MainActivity
}
