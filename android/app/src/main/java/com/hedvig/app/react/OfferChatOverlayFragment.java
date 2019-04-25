package com.hedvig.app.react;

import android.app.Dialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.DialogFragment;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.LocalBroadcastManager;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.ImageView;

import androidx.navigation.Navigation;

import com.apollographql.apollo.ApolloClient;
import com.apollographql.apollo.rx2.Rx2Apollo;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.hedvig.android.owldroid.graphql.LogoutMutation;
import com.hedvig.app.NativeRoutingModule;
import com.hedvig.app.R;

import org.jetbrains.annotations.NotNull;

import javax.inject.Inject;

import dagger.android.support.AndroidSupportInjection;
import io.reactivex.disposables.CompositeDisposable;
import timber.log.Timber;

public class OfferChatOverlayFragment extends DialogFragment implements DefaultHardwareBackBtnHandler {

    @Inject
    public ApolloClient apolloClient;

    ViewGroup dialogView;
    ReactRootView mReactRootView;

    CompositeDisposable compositeDisposable = new CompositeDisposable();

    LocalBroadcastManager localBroadcastManager;

    @Override
    public int getTheme() {
        return R.style.DialogTheme;
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        AndroidSupportInjection.inject(this);
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        Dialog dialog = new Dialog(getActivity());
        dialogView = (ViewGroup) LayoutInflater.from(getActivity()).inflate(R.layout.offer_chat_overlay_dialog, null);
        dialog.getWindow().requestFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(dialogView);
        return dialog;
    }

    @Override
    public void onStart() {
        super.onStart();
        localBroadcastManager = LocalBroadcastManager.getInstance(requireContext());

        DisplayMetrics metrics = new DisplayMetrics();
        WindowManager wm = (WindowManager) requireActivity().getSystemService(Context.WINDOW_SERVICE);
        wm.getDefaultDisplay().getMetrics(metrics);
        float heightPixels = metrics.heightPixels;

        Dialog dialog = getDialog();
        if (dialog != null) {
            dialog.getWindow().setGravity(Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL);
            dialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, (int) (heightPixels * 0.9f));
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.WHITE));
        }
    }

    @Override
    public void setupDialog(@NotNull Dialog dialog, int style) {
        setUpDialogTopBar(dialogView);

        mReactRootView = new ReactRootView(requireContext());
        mReactRootView.startReactApplication(getReactInstanceManager(), "OfferChat", getArguments());
        ((FrameLayout) dialogView.findViewById(R.id.fragmentContainer)).addView(mReactRootView);
    }

    private void setUpDialogTopBar(ViewGroup dialogView) {
        ImageView closeDialogButton = dialogView.findViewById(R.id.closeChatDialog);
        closeDialogButton.setOnClickListener(v -> dismiss());

        ImageView resetButton = dialogView.findViewById(R.id.resetChatButton);
        resetButton.setOnClickListener(v -> {
            final Dialog dialog = new Dialog(requireContext());
            View resetDialogView = LayoutInflater.from(requireContext()).inflate(R.layout.reset_onboarding_dialog, null);
            dialog.getWindow().setBackgroundDrawable(ContextCompat.getDrawable(requireContext(), R.drawable.dialog_background));
            dialog.setContentView(resetDialogView);

            resetDialogView.findViewById(R.id.chatResetDialogNegativeButton).setOnClickListener((view) -> dialog.dismiss());
            resetDialogView.findViewById(R.id.chatResetDialogPositiveButton).setOnClickListener((view) -> {
                dialog.dismiss();
                logout();
            });

            dialog.show();
        });
    }

    private void logout() {
        compositeDisposable.add(Rx2Apollo.from(apolloClient.mutate(new LogoutMutation())).subscribe(data -> {
            loggedout();
        }, e -> {}));
    }

    private void loggedout() {
        Timber.i("logged out >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

        Intent resetLogoutIntent = new Intent(NativeRoutingModule.ON_BOARDING_INTENT_FILER);
        resetLogoutIntent.putExtra("action", "logout");
        Timber.i("OnBoardingBroadcastReceiver sendBroadcast");
        localBroadcastManager.sendBroadcast(resetLogoutIntent);
        dismiss();
        Navigation.findNavController(requireActivity(), com.hedvig.app.common.R.id.rootNavigationHost).popBackStack();
    }

    @Override
    public void onPause() {
        super.onPause();
        compositeDisposable.clear();
        Timber.i("Pause!");

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
