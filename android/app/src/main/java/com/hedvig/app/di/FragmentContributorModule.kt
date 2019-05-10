package com.hedvig.app.di

import com.hedvig.app.feature.claims.ui.ClaimsFragment
import com.hedvig.app.feature.claims.ui.commonclaim.CommonClaimFragment
import com.hedvig.app.feature.claims.ui.commonclaim.EmergencyFragment
import com.hedvig.app.feature.claims.ui.pledge.HonestyPledgeBottomSheet
import com.hedvig.app.feature.dashboard.ui.DashboardFragment
import com.hedvig.app.feature.marketing.ui.MarketingFragment
import com.hedvig.app.feature.marketing.ui.StoryFragment
import com.hedvig.app.feature.profile.ui.ProfileFragment
import com.hedvig.app.feature.profile.ui.aboutapp.AboutAppFragment
import com.hedvig.app.feature.profile.ui.charity.CharityFragment
import com.hedvig.app.feature.profile.ui.coinsured.CoinsuredFragment
import com.hedvig.app.feature.profile.ui.myhome.ChangeHomeInfoDialog
import com.hedvig.app.feature.profile.ui.myhome.MyHomeFragment
import com.hedvig.app.feature.profile.ui.myinfo.MyInfoFragment
import com.hedvig.app.feature.profile.ui.payment.PaymentFragment
import com.hedvig.app.feature.profile.ui.payment.TrustlyFragment
import com.hedvig.app.feature.profile.ui.referral.ReferralFragment
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class FragmentContributorModule {
    @ContributesAndroidInjector
    abstract fun contributeStoryFragment(): StoryFragment

    @ContributesAndroidInjector
    abstract fun contributeMarketingFragment(): MarketingFragment

    @ContributesAndroidInjector
    abstract fun contributeProfileFragment(): ProfileFragment

    @ContributesAndroidInjector
    abstract fun contributeMyInfoFragment(): MyInfoFragment

    @ContributesAndroidInjector
    abstract fun contributePaymentFragment(): PaymentFragment

    @ContributesAndroidInjector
    abstract fun contributeTrustlyFragment(): TrustlyFragment

    @ContributesAndroidInjector
    abstract fun contributeMyHomeFragment(): MyHomeFragment

    @ContributesAndroidInjector
    abstract fun contributeCoinsuredFragment(): CoinsuredFragment

    @ContributesAndroidInjector
    abstract fun contributeCharityFragment(): CharityFragment

    @ContributesAndroidInjector
    abstract fun contributeReferralFragment(): ReferralFragment

    @ContributesAndroidInjector
    abstract fun contributeAboutAppFragment(): AboutAppFragment

    @ContributesAndroidInjector
    abstract fun contributeClaimsFragment(): ClaimsFragment

    @ContributesAndroidInjector
    abstract fun contributeCommonClaimFragment(): CommonClaimFragment

    @ContributesAndroidInjector
    abstract fun contributeEmergencyFragment(): EmergencyFragment

    @ContributesAndroidInjector
    abstract fun contributeDashboardFragment(): DashboardFragment

    @ContributesAndroidInjector
    abstract fun contributeHonestyPledgeBottomSheet(): HonestyPledgeBottomSheet

    @ContributesAndroidInjector
    abstract fun contributeChangeHomeInfoDialog(): ChangeHomeInfoDialog
}
