package com.hedvig.app

import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.WindowManager
import androidx.navigation.findNavController
import androidx.navigation.fragment.NavHostFragment
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks
import com.hedvig.android.owldroid.util.NavigationAnalytics
import com.hedvig.android.owldroid.util.extensions.compatColor
import com.hedvig.android.owldroid.util.extensions.isLoggedIn
import com.hedvig.android.owldroid.util.whenApiVersion
import com.hedvig.android.owldroid.util.react.AsyncStorageNative
import dagger.android.AndroidInjection
import io.branch.rnbranch.RNBranchModule
import javax.inject.Inject
import com.hedvig.app.common.R as CommonR

class MainActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {

    @Inject
    lateinit var asyncStorageNative: AsyncStorageNative

    private val reactInstanceManager: ReactInstanceManager
        get() = reactNativeHost.reactInstanceManager

    private val reactNativeHost: ReactNativeHost
        get() = (application as ReactApplication).reactNativeHost

    override fun onStart() {
        super.onStart()
        RNBranchModule.initSession(intent.data, this)

        FirebaseDynamicLinks.getInstance().getDynamicLink(intent).addOnSuccessListener { pendingDynamicLinkData ->
            if (pendingDynamicLinkData != null && pendingDynamicLinkData.link != null) {
                val link = pendingDynamicLinkData.link
                val referee = link.getQueryParameter("memberId")
                val incentive = link.getQueryParameter("incentive")
                if (referee != null && incentive != null) {
                    getSharedPreferences("referrals", Context.MODE_PRIVATE).edit().putString("referee", referee)
                        .putString("incentive", incentive).apply()

                    val b = Bundle()
                    b.putString("invitedByMemberId", referee)
                    b.putString("incentive", incentive)

                    FirebaseAnalytics.getInstance(this).logEvent("referrals_open", b)
                }
            }
        }
    }

    public override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
    }

    override fun onPause() {
        reactInstanceManager.onHostPause(this)
        super.onPause()
    }

    override fun onResume() {
        reactInstanceManager.onHostResume(this, this)
        super.onResume()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        setTheme(R.style.Theme_Exponent_Light)
        super.onCreate(savedInstanceState)
        setContentView(CommonR.layout.root_navigation_host)
        //don't like this but something is setting the color to dark gray. My current guess is react native
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
        whenApiVersion(Build.VERSION_CODES.M) {
            window.statusBarColor = this.compatColor(R.color.off_white)
        }
        AndroidInjection.inject(this)

        val navHost = supportFragmentManager.findFragmentById(CommonR.id.rootNavigationHost) as NavHostFragment
        val navController = navHost.navController

        val graph = navController.navInflater.inflate(CommonR.navigation.root)

        if (applicationContext.isLoggedIn()) {
            graph.startDestination = CommonR.id.logged_in_navigation
        }
        navController.graph = graph


        findNavController(CommonR.id.rootNavigationHost).addOnDestinationChangedListener(NavigationAnalytics(this))
    }

    override fun onBackPressed() {
        if (reactNativeHost.hasInstance()) {
            reactInstanceManager.onBackPressed()
        } else {
            super.onBackPressed()
        }
    }

    override fun invokeDefaultOnBackPressed() {
        super.onBackPressed()
    }

    override fun onDestroy() {
        asyncStorageNative.close()
        super.onDestroy()
    }
}
