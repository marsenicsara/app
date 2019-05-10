package com.hedvig.app.react

import com.hedvig.app.MainActivity
import com.hedvig.app.feature.chat.ChatFragment
import com.hedvig.app.feature.chat.UploadBottomSheet
import com.hedvig.app.feature.offer.OfferChatOverlayFragment
import com.hedvig.app.feature.offer.OfferFragment

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

    @ContributesAndroidInjector
    abstract fun contributeUploadBottomSheet(): UploadBottomSheet
}
