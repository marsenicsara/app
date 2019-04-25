package com.hedvig.app.react

import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactRootView
import com.facebook.react.common.LifecycleState
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

import dagger.android.support.AndroidSupportInjection

class ChatFragment : Fragment(), DefaultHardwareBackBtnHandler {

    private var mReactRootView: ReactRootView? = null

    protected val reactNativeHost: ReactNativeHost
        get() = (activity!!.application as ReactApplication).reactNativeHost

    internal val reactInstanceManager: ReactInstanceManager
        get() = reactNativeHost.reactInstanceManager

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        AndroidSupportInjection.inject(this)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val reactRootView = ReactRootView(requireContext())
        mReactRootView = reactRootView
        reactRootView.startReactApplication(reactInstanceManager, "Chat", arguments)
        return reactRootView
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
