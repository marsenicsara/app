package com.hedvig.app.di

import com.hedvig.app.MainApplication
import com.hedvig.app.di.viewmodel.ViewModelModule
import com.hedvig.app.di.worker.WorkerModule
import dagger.BindsInstance
import dagger.Component
import dagger.android.AndroidInjector
import dagger.android.support.AndroidSupportInjectionModule
import javax.inject.Singleton

@Singleton
@Component(
    modules = [
        ApplicationModule::class,
        ConfigModule::class,
        AndroidSupportInjectionModule::class,
        ActivityContributorModule::class,
        FragmentContributorModule::class,
        ServiceContributorModule::class,
        ViewModelModule::class,
        WorkerModule::class
    ]
)
interface ApplicationComponent : AndroidInjector<MainApplication> {
    override fun inject(mainApplication: MainApplication)

    @Component.Builder
    interface Builder {
        @BindsInstance
        fun application(application: MainApplication): Builder

        fun build(): ApplicationComponent
    }
}
