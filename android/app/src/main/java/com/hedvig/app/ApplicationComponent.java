package com.hedvig.app;

import com.hedvig.android.app.AppModule;
import com.hedvig.android.app.FragmentContributorModule;
import com.hedvig.android.app.ViewModelModule;

import javax.inject.Singleton;

import dagger.BindsInstance;
import dagger.Component;
import dagger.android.AndroidInjector;
import dagger.android.support.AndroidSupportInjectionModule;

@Singleton
@Component(modules = { AndroidSupportInjectionModule.class, ApplicationModule.class, AppModule.class, ViewModelModule.class, FragmentContributorModule.class})
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
