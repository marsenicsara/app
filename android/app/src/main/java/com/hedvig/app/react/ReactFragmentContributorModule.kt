package com.hedvig.app.react

import com.hedvig.app.MainActivity
import com.hedvig.app.react.chat.ChatFragment
import com.hedvig.app.react.offer.OfferChatOverlayFragment
import com.hedvig.app.react.offer.OfferFragment

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
