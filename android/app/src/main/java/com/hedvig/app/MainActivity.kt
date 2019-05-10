package com.hedvig.app

import android.annotation.TargetApi
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.fragment.NavHostFragment
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks
import com.hedvig.app.util.NavigationAnalytics
import com.hedvig.app.util.extensions.compatColor
import com.hedvig.app.util.extensions.isLoggedIn
import com.hedvig.app.util.react.AsyncStorageNative
import com.hedvig.app.util.whenApiVersion
import dagger.android.AndroidInjection
import io.branch.rnbranch.RNBranchModule
import javax.inject.Inject

class MainActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler, PermissionAwareActivity {

    private var permissionListener: PermissionListener? = null

    @TargetApi(Build.VERSION_CODES.M)
    override fun requestPermissions(permissions: Array<String>, requestCode: Int, listener: PermissionListener?) {
        permissionListener = listener
        super.requestPermissions(permissions, requestCode)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
        if (permissionListener?.onRequestPermissionsResult(requestCode, permissions, grantResults) == true) {
            permissionListener = null
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        reactInstanceManager.onActivityResult(this, requestCode, resultCode, data)
    }

    @Inject
    lateinit var asyncStorageNative: AsyncStorageNative

    @Inject
    lateinit var firebaseAnalytics: FirebaseAnalytics

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
        setContentView(R.layout.root_navigation_host)
        whenApiVersion(Build.VERSION_CODES.M) {
            window.statusBarColor = compatColor(R.color.off_white)
        }
        AndroidInjection.inject(this)

        val navHost = supportFragmentManager.findFragmentById(R.id.rootNavigationHost) as NavHostFragment
        val navController = navHost.navController

        val graph = navController.navInflater.inflate(R.navigation.root)

        if (applicationContext.isLoggedIn()) {
            graph.startDestination = R.id.logged_in_navigation
        }
        navController.graph = graph


        findNavController(R.id.rootNavigationHost).addOnDestinationChangedListener(
            NavigationAnalytics(
                firebaseAnalytics,
                this
            )
        )
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
