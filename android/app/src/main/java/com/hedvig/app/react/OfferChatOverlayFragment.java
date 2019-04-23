package com.hedvig.app.react;

import android.app.Dialog;
import android.content.Context;
import android.graphics.Color;
import android.support.v4.app.DialogFragment;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.WindowManager;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.hedvig.app.R;

import org.jetbrains.annotations.NotNull;

public class OfferChatOverlayFragment extends DialogFragment implements DefaultHardwareBackBtnHandler {
    ReactRootView mReactRootView;

    @Override
    public int getTheme() {
        return R.style.DialogTheme;
    }

    @Override
    public void setupDialog(@NotNull Dialog dialog, int style) {
        mReactRootView = new ReactRootView(requireContext());
        mReactRootView.startReactApplication(getReactInstanceManager(), "OfferChat", getArguments());

        DisplayMetrics metrics = new DisplayMetrics();
        WindowManager wm = (WindowManager) requireActivity().getSystemService(Context.WINDOW_SERVICE);
        wm.getDefaultDisplay().getMetrics(metrics);
        float heightPixels = metrics.heightPixels;
        int widthPixels = metrics.widthPixels;

        dialog.setContentView(mReactRootView);
        dialog.getWindow().setLayout(-1, (int) (heightPixels * 0.75f));
        dialog.getWindow().setGravity(Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL);
        dialog.getWindow().getDecorView().setPadding(0,0,0,0);
        dialog.getWindow().getDecorView().setMinimumWidth(widthPixels);
        dialog.getWindow().getDecorView().setLayoutParams(new WindowManager.LayoutParams(-1, -1));
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
