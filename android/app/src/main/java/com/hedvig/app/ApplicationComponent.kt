package com.hedvig.app

import com.hedvig.app.di.FragmentContributorModule
import com.hedvig.app.di.OwldroidModule
import com.hedvig.app.di.ViewModelModule
import com.hedvig.app.di.AppViewModelModule

import javax.inject.Singleton

import com.hedvig.app.react.ReactFragmentContributorModule
import dagger.BindsInstance
import dagger.Component
import dagger.android.AndroidInjector
import dagger.android.support.AndroidSupportInjectionModule

@Singleton
@Component(modules = [AndroidSupportInjectionModule::class, ApplicationModule::class, OwldroidModule::class, ViewModelModule::class, FragmentContributorModule::class, ReactFragmentContributorModule::class, AppViewModelModule::class, ServiceContributorModule::class])
interface ApplicationComponent : AndroidInjector<MainApplication> {
    override fun inject(mainApplication: MainApplication)

    @Component.Builder
    interface Builder {
        @BindsInstance
        fun application(application: MainApplication): Builder

        fun build(): ApplicationComponent
    }
}
