package com.hedvig.app.react

import android.app.Dialog
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.support.v4.app.DialogFragment
import android.support.v4.content.ContextCompat
import android.support.v4.content.LocalBroadcastManager
import android.util.DisplayMetrics
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.Window
import android.view.WindowManager
import android.widget.FrameLayout
import android.widget.ImageView

import androidx.navigation.Navigation

import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.rx2.Rx2Apollo
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactRootView
import com.facebook.react.common.LifecycleState
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.hedvig.android.owldroid.graphql.LogoutMutation
import com.hedvig.android.owldroid.util.extensions.localBroadcastManager
import com.hedvig.app.NativeRoutingModule
import com.hedvig.app.R

import javax.inject.Inject

import dagger.android.support.AndroidSupportInjection
import io.reactivex.disposables.CompositeDisposable
import timber.log.Timber

class OfferChatOverlayFragment : DialogFragment(), DefaultHardwareBackBtnHandler {

    @Inject
    lateinit var apolloClient: ApolloClient

    lateinit var dialogView: ViewGroup
    private var mReactRootView: ReactRootView? = null

    private val compositeDisposable = CompositeDisposable()

    private val reactNativeHost: ReactNativeHost
        get() = (requireActivity().application as ReactApplication).reactNativeHost

    private val reactInstanceManager: ReactInstanceManager
        get() = reactNativeHost.reactInstanceManager

    override fun getTheme(): Int {
        return R.style.DialogTheme
    }

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        AndroidSupportInjection.inject(this)
    }

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val dialog = Dialog(activity!!)
        dialogView = LayoutInflater.from(activity).inflate(R.layout.offer_chat_overlay_dialog, null) as ViewGroup
        dialog.window!!.requestFeature(Window.FEATURE_NO_TITLE)
        dialog.setContentView(dialogView)
        return dialog
    }

    override fun onStart() {
        super.onStart()

        val metrics = DisplayMetrics()
        val wm = requireActivity().getSystemService(Context.WINDOW_SERVICE) as WindowManager
        wm.defaultDisplay.getMetrics(metrics)
        val heightPixels = metrics.heightPixels.toFloat()

        val dialog = dialog
        if (dialog != null) {
            dialog.window!!.setGravity(Gravity.BOTTOM or Gravity.CENTER_HORIZONTAL)
            dialog.window!!.setLayout(ViewGroup.LayoutParams.MATCH_PARENT, (heightPixels * 0.9f).toInt())
            dialog.window!!.setBackgroundDrawable(ColorDrawable(Color.WHITE))
        }
    }

    override fun setupDialog(dialog: Dialog, style: Int) {
        setUpDialogTopBar(dialogView)

        mReactRootView = ReactRootView(requireContext())
        mReactRootView!!.startReactApplication(reactInstanceManager, "OfferChat", arguments)
        (dialogView.findViewById<View>(R.id.fragmentContainer) as FrameLayout).addView(mReactRootView)
    }

    private fun setUpDialogTopBar(dialogView: ViewGroup) {
        val closeDialogButton = dialogView.findViewById<ImageView>(R.id.closeChatDialog)
        closeDialogButton.setOnClickListener { v -> dismiss() }

        val resetButton = dialogView.findViewById<ImageView>(R.id.resetChatButton)
        resetButton.setOnClickListener {
            val dialog = Dialog(requireContext())
            val resetDialogView = LayoutInflater.from(requireContext()).inflate(R.layout.reset_onboarding_dialog, null)
            dialog.window!!.setBackgroundDrawable(
                ContextCompat.getDrawable(
                    requireContext(),
                    R.drawable.dialog_background
                )
            )
            dialog.setContentView(resetDialogView)

            resetDialogView.findViewById<View>(R.id.chatResetDialogNegativeButton)
                .setOnClickListener { dialog.dismiss() }
            resetDialogView.findViewById<View>(R.id.chatResetDialogPositiveButton).setOnClickListener {
                dialog.dismiss()
                logout()
            }

            dialog.show()
        }
    }

    private fun logout() {
        compositeDisposable.add(
            Rx2Apollo.from(apolloClient.mutate(LogoutMutation())).subscribe(
                { loggedout() },
                { Timber.e(it) })
        )
    }

    private fun loggedout() {
        Timber.i("logged out >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

        val resetLogoutIntent = Intent(NativeRoutingModule.ON_BOARDING_INTENT_FILER)
        resetLogoutIntent.putExtra("action", "logout")
        Timber.i("OnBoardingBroadcastReceiver sendBroadcast")
        localBroadcastManager.sendBroadcast(resetLogoutIntent)
        dismiss()
        Navigation.findNavController(requireActivity(), com.hedvig.app.common.R.id.rootNavigationHost).popBackStack()
    }

    override fun onPause() {
        super.onPause()
        compositeDisposable.clear()
        Timber.i("Pause!")
    }

    override fun onDestroy() {
        super.onDestroy()
        if (mReactRootView != null) {
            mReactRootView!!.unmountReactApplication()
            mReactRootView = null
        }
        if (reactInstanceManager.lifecycleState != LifecycleState.RESUMED) {
            reactInstanceManager.onHostDestroy(activity)
            reactNativeHost.clear()
        }
    }

    override fun invokeDefaultOnBackPressed() {
        if (activity != null) {
            activity!!.onBackPressed()
        }
    }
}
