package com.hedvig.app;

import com.hedvig.android.owldroid.di.FragmentContributorModule;
import com.hedvig.android.owldroid.di.OwldroidModule;
import com.hedvig.android.owldroid.di.ViewModelModule;

import javax.inject.Singleton;

import com.hedvig.app.react.ReactFragmentContributorModule;
import dagger.BindsInstance;
import dagger.Component;
import dagger.android.AndroidInjector;
import dagger.android.support.AndroidSupportInjectionModule;

@Singleton
@Component(modules = { AndroidSupportInjectionModule.class, ApplicationModule.class, OwldroidModule.class, ViewModelModule.class, FragmentContributorModule.class, ReactFragmentContributorModule.class })
public interface ApplicationComponent extends AndroidInjector<MainApplication> {
    @Override
    void inject(MainApplication mainApplication);

    @Component.Builder
    interface Builder {
        @BindsInstance
        Builder application(MainApplication application);
        ApplicationComponent build();
    }
}
