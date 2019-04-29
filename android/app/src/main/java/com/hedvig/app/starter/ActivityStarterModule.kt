package com.hedvig.app.starter

import android.content.Intent
import android.support.v4.app.FragmentActivity
import android.support.v4.app.FragmentManager
import android.support.v4.content.LocalBroadcastManager

import androidx.navigation.Navigation

import com.facebook.react.bridge.*
import com.hedvig.android.owldroid.ui.dashboard.PerilBottomSheet
import com.hedvig.android.owldroid.ui.dashboard.PerilIcon
import com.hedvig.app.MainApplication
import com.hedvig.app.react.offer.OfferChatOverlayFragment
import com.hedvig.app.utils.setIsLoggedIn
import com.hedvig.app.utils.triggerRestartCurrentActivity


internal class ActivityStarterModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val fragmentManager: FragmentManager
        get() = (reactApplicationContext.currentActivity as FragmentActivity).supportFragmentManager

    private val localBroadcastManager = LocalBroadcastManager.getInstance(reactContext)

    private val navController by lazy {
        reactApplicationContext.currentActivity?.let {
            Navigation.findNavController(it, com.hedvig.app.common.R.id.rootNavigationHost)
        } ?: throw RuntimeException("Trying to reactApplicationContext.currentActivity but it is null")
    }

    override fun getName(): String {
        return "ActivityStarter"
    }

    @ReactMethod
    fun navigateToOfferFromChat() {
        val activity = reactApplicationContext.currentActivity
        if (activity != null) {
            navController
                .navigate(com.hedvig.app.common.R.id.action_chatFragment_to_offerFragment)
        }
    }

    @ReactMethod
    fun navigateToChatFromOffer() {
        val activity = reactApplicationContext.currentActivity
        if (activity != null) {
            navController
                .navigate(com.hedvig.app.common.R.id.action_offerFragment_to_chatFragment)
        }
    }

    @ReactMethod
    fun navigateToLoggedInFromChat() {
        val activity = reactApplicationContext.currentActivity
        if (activity != null) {
            activity.setIsLoggedIn(true)
            navController
                .navigate(com.hedvig.app.common.R.id.action_chatFragment_to_logged_in_navigation)
        }
    }

    @ReactMethod
    fun showOfferChatOverlay() {
        val offerChatOverlayFragment = OfferChatOverlayFragment()
        offerChatOverlayFragment.show(fragmentManager, "OfferChatOverlay")
    }

    @ReactMethod
    fun showPerilOverlay(subject: String, iconId: String, title: String, description: String) {
        PerilBottomSheet.newInstance(subject, PerilIcon.from(iconId), title, description)
            .show(fragmentManager, "perilSheet")
    }

    @ReactMethod
    fun restartApplication() =
        reactApplicationContext.currentActivity?.triggerRestartCurrentActivity()

    @ReactMethod
    fun reloadChat() =
        localBroadcastManager.sendBroadcast(Intent(BROADCAST_RELOAD_CHAT))

    @ReactMethod
    fun getActivityName(callback: Callback) {
        val activity = currentActivity
        if (activity != null) {
            callback.invoke(activity.javaClass.simpleName)
        } else {
            callback.invoke("No current activity")
        }
    }

    @ReactMethod
    fun getActivityNameAsPromise(promise: Promise) {
        val activity = currentActivity
        if (activity != null) {
            promise.resolve(activity.javaClass.simpleName)
        } else {
            promise.reject("NO_ACTIVITY", "No current activity")
        }
    }

    @ReactMethod
    fun callJavaScript() {
        val activity = currentActivity
        if (activity != null) {
            val application = activity.application as MainApplication
            val reactNativeHost = application.reactNativeHost
            val reactInstanceManager = reactNativeHost.reactInstanceManager
            val reactContext = reactInstanceManager.currentReactContext

            if (reactContext != null) {
                val catalystInstance = reactContext.catalystInstance
                val params = WritableNativeArray()
                params.pushString("Hello, JavaScript!")

                catalystInstance.callFunction("JavaScriptVisibleToJava", "alert", params)
            }
        }
    }

    companion object {
        const val BROADCAST_RELOAD_CHAT = "reloadChat"
    }
}
