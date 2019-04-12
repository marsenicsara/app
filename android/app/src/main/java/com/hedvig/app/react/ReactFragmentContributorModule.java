package com.hedvig.app.react;

import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
public abstract class ReactFragmentContributorModule {
    @ContributesAndroidInjector
    abstract ChatFragment contributeChatFragment();

    @ContributesAndroidInjector
    abstract ReactTestActivity contributeReactTestActivity();
}
