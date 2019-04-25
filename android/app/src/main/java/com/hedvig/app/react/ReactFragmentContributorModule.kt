package com.hedvig.app.react

import com.hedvig.app.MainActivity

import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class ReactFragmentContributorModule {
    @ContributesAndroidInjector
    internal abstract fun contributeChatFragment(): ChatFragment

    @ContributesAndroidInjector
    internal abstract fun contributeOfferFragment(): OfferFragment

    @ContributesAndroidInjector
    internal abstract fun contributeMainActivity(): MainActivity

    @ContributesAndroidInjector
    internal abstract fun contributeOfferChatOverlayFragment(): OfferChatOverlayFragment
}
