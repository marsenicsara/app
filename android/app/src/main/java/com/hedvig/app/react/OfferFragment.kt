package com.hedvig.app.react

import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.ViewGroup
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactRootView
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import dagger.android.support.AndroidSupportInjection
import javax.inject.Inject

class OfferFragment : Fragment(), DefaultHardwareBackBtnHandler {

    @Inject
    lateinit var reactInstanceManager: ReactInstanceManager

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        AndroidSupportInjection.inject(this)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?) =
        ReactRootView(requireContext()).apply {
            startReactApplication(reactInstanceManager, "Offer", null)
        }

    override fun invokeDefaultOnBackPressed() {
        activity?.onBackPressed()
    }
}
