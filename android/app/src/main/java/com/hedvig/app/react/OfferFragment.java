package com.hedvig.app.react;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

import javax.inject.Inject;

import dagger.android.support.AndroidSupportInjection;
import timber.log.Timber;

public class OfferFragment extends Fragment implements DefaultHardwareBackBtnHandler {

    // @Inject
    // public ReactInstanceManager reactInstanceManager;


    ReactRootView mReactRootView;

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        AndroidSupportInjection.inject(this);
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        ReactRootView reactRootView = new ReactRootView(requireContext());
        mReactRootView = reactRootView;
        reactRootView.startReactApplication(getReactInstanceManager(), "Offer", getArguments());
        return reactRootView;
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
        FragmentActivity activity = getActivity();
        if (activity != null) activity.onBackPressed();
    }
}
