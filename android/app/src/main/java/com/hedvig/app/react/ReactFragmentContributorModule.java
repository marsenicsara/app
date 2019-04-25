package com.hedvig.app.react;

import com.hedvig.app.MainActivity;

import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
public abstract class ReactFragmentContributorModule {
    @ContributesAndroidInjector
    abstract ChatFragment contributeChatFragment();

    @ContributesAndroidInjector
    abstract OfferFragment contributeOfferFragment();

    @ContributesAndroidInjector
    abstract MainActivity contributeMainActivity();

    @ContributesAndroidInjector
    abstract OfferChatOverlayFragment contributeOfferChatOverlayFragment();
}
