package com.hedvig.app.react

import com.hedvig.app.MainActivity

import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class ReactFragmentContributorModule {
    @ContributesAndroidInjector
    abstract fun contributeChatFragment(): ChatFragment

    @ContributesAndroidInjector
    abstract fun contributeOfferFragment(): OfferFragment

    @ContributesAndroidInjector
    abstract fun contributeMainActivity(): MainActivity

    @ContributesAndroidInjector
    abstract fun contributeOfferChatOverlayFragment(): OfferChatOverlayFragment
}
