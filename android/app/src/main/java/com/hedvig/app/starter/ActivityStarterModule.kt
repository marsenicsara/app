package com.hedvig.app.starter

import android.content.Intent
import android.os.Bundle
import android.support.v4.app.FragmentActivity
import android.support.v4.app.FragmentManager
import android.support.v4.content.LocalBroadcastManager
import androidx.navigation.Navigation
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.rx2.Rx2Apollo
import com.facebook.react.bridge.*
import com.google.firebase.analytics.FirebaseAnalytics
import com.hedvig.android.owldroid.graphql.InsuranceStatusQuery
import com.hedvig.android.owldroid.type.InsuranceStatus
import com.hedvig.android.owldroid.ui.dashboard.PerilBottomSheet
import com.hedvig.android.owldroid.ui.dashboard.PerilIcon
import com.hedvig.android.owldroid.util.extensions.setIsLoggedIn
import com.hedvig.android.owldroid.util.extensions.triggerRestartCurrentActivity
import com.hedvig.app.MainApplication
import com.hedvig.app.react.offer.OfferChatOverlayFragment
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.rxkotlin.plusAssign
import timber.log.Timber
import com.facebook.react.bridge.ReadableMapKeySetIterator



class ActivityStarterModule(reactContext: ReactApplicationContext, private val apolloClient: ApolloClient) :
    ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

    private val disposables = CompositeDisposable()

    private val fragmentManager: FragmentManager
        get() = (reactApplicationContext.currentActivity as FragmentActivity).supportFragmentManager


    private val firebaseAnalytics by lazy { FirebaseAnalytics.getInstance(reactApplicationContext) }

    private val localBroadcastManager = LocalBroadcastManager.getInstance(reactContext)

    private val navController by lazy {
        reactApplicationContext.currentActivity?.let {
            Navigation.findNavController(it, com.hedvig.app.common.R.id.rootNavigationHost)
        }
            ?: throw RuntimeException("Trying to reactApplicationContext.currentActivity but it is null")
    }

    override fun getName(): String {
        return "ActivityStarter"
    }

    override fun onHostResume() {
    }

    override fun onHostPause() {
    }

    override fun onHostDestroy() {
        disposables.dispose()
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
            reactApplicationContext.setIsLoggedIn(true)
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
    fun logEvent(eventName: String, map: ReadableMap) =
        firebaseAnalytics.logEvent(eventName, convertMapToBundle(map))

    @ReactMethod
    fun restartApplication() =
        reactApplicationContext.currentActivity?.triggerRestartCurrentActivity()

    @ReactMethod
    fun reloadChat() =
        localBroadcastManager.sendBroadcast(Intent(BROADCAST_RELOAD_CHAT))

    @ReactMethod
    fun doIsLoggedInProcedure() {
        disposables += Rx2Apollo
            .from(apolloClient.query(InsuranceStatusQuery()))
            .subscribe({ response ->
                response.data()?.insurance()?.status()?.let { status ->
                    when (status) {
                        InsuranceStatus.INACTIVE,
                        InsuranceStatus.INACTIVE_WITH_START_DATE,
                        InsuranceStatus.ACTIVE -> navigateToLoggedInFromChat()
                        InsuranceStatus.PENDING,
                        InsuranceStatus.TERMINATED,
                        InsuranceStatus.`$UNKNOWN` -> {
                            // Let the chat take care of this
                        }
                    }
                }
            }, { Timber.e(it) })
    }

    private fun convertMapToBundle(readableMap: ReadableMap): Bundle {
        val bundle = Bundle()
        val iterator = readableMap.keySetIterator()
        while (iterator.hasNextKey()) {
            val key = iterator.nextKey()
            when (readableMap.getType(key)) {
                ReadableType.Boolean -> bundle.putBoolean(key, readableMap.getBoolean(key))
                ReadableType.Number ->  bundle.putDouble(key, readableMap.getDouble(key))
                ReadableType.String ->  bundle.putString(key, readableMap.getString(key))
                ReadableType.Map -> bundle.putBundle(key, convertMapToBundle(readableMap.getMap(key)))
                else -> { Timber.e("We don't cover null or array")}
            }
        }
        return bundle
    }

    companion object {
        const val BROADCAST_RELOAD_CHAT = "reloadChat"
    }
}
