package com.hedvig.app.react;

import android.app.Dialog;
import android.support.v4.app.DialogFragment;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import org.jetbrains.annotations.NotNull;

public class OfferChatOverlayFragment extends DialogFragment implements DefaultHardwareBackBtnHandler {
    ReactRootView mReactRootView;

    @Override
    public void setupDialog(@NotNull Dialog dialog, int style) {
        mReactRootView = new ReactRootView(requireContext());
        mReactRootView.startReactApplication(getReactInstanceManager(), "OfferChat", getArguments());
        dialog.setContentView(mReactRootView);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (mReactRootView != null) {
            mReactRootView.unmountReactApplication();
            mReactRootView = null;
        }
        if (getReactInstanceManager().getLifecycleState() != LifecycleState.RESUMED) {
            getReactInstanceManager().onHostDestroy(getActivity());
            getReactNativeHost().clear();
        }
    }

    protected ReactNativeHost getReactNativeHost() {
        return ((ReactApplication) getActivity().getApplication()).getReactNativeHost();
    }

    ReactInstanceManager getReactInstanceManager() {
        return getReactNativeHost().getReactInstanceManager();
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        if (getActivity() != null) {
            getActivity().onBackPressed();
        }
    }
}
