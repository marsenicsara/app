package com.hedvig.app

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.NotificationManagerCompat
import android.support.v7.app.AlertDialog
import android.support.v7.app.AppCompatActivity
import android.widget.Toast
import androidx.navigation.findNavController

import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks
import com.hedvig.android.owldroid.util.NavigationAnalytics
import com.hedvig.android.owldroid.util.react.AsyncStorageNativeReader
import dagger.android.AndroidInjection
import io.branch.rnbranch.RNBranchModule
import javax.inject.Inject

class MainActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {

    @Inject
    lateinit var asyncStorageNativeReader: AsyncStorageNativeReader

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
        super.onCreate(savedInstanceState)
        AndroidInjection.inject(this)

        val application = application as MainApplication
        val reactNativeHost = application.reactNativeHost
        val reactInstanceManager = reactNativeHost.reactInstanceManager
        val devSupportManager = reactInstanceManager.devSupportManager

        devSupportManager.addCustomDevOption("Custom dev option") {
            if (NotificationManagerCompat.from(this@MainActivity).areNotificationsEnabled()) {
                Toast.makeText(this@MainActivity, "Dev opt", Toast.LENGTH_LONG).show()
            } else {
                val dialog = AlertDialog.Builder(this@MainActivity).create()
                dialog.setTitle("Dev option")
                dialog.setMessage("Dev opt")
                dialog.show()
            }
        }

        val isLoggedIn = try {
            asyncStorageNativeReader.getKey("@hedvig:token")
            true
        } catch (exception: Exception) {
            false
        }

        if (isLoggedIn) navigateToLoggedInScreen() else navigateToMarketing()
    }

    private fun navigateToLoggedInScreen() {
        setContentView(R.layout.logged_in_navigation_host)

        findNavController(R.id.loggedInNavigationHost).addOnDestinationChangedListener(NavigationAnalytics(this))
    }

    private fun navigateToMarketing() {
        setContentView(R.layout.root_navigation_host)

        findNavController(R.id.rootNavigationHost).addOnDestinationChangedListener(NavigationAnalytics(this))
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
}
