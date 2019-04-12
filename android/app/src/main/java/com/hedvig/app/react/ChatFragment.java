package com.hedvig.app.react;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import dagger.android.support.AndroidSupportInjection;
import javax.inject.Inject;

public class ChatFragment extends Fragment implements DefaultHardwareBackBtnHandler {

    @Inject
    ReactInstanceManager reactInstanceManager;

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        AndroidSupportInjection.inject(this);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        ReactRootView reactRootView = new ReactRootView(requireContext());
        reactRootView.startReactApplication(reactInstanceManager, "Chat", null);
        return reactRootView;
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        if (getActivity() != null) {
            getActivity().onBackPressed();
        }
    }
}
