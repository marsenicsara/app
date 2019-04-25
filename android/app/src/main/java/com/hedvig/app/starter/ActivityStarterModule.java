package com.hedvig.app.starter;

import android.app.Activity;
import android.support.annotation.NonNull;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;

import androidx.navigation.Navigation;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.*;
import com.hedvig.android.owldroid.ui.dashboard.PerilBottomSheet;
import com.hedvig.android.owldroid.ui.dashboard.PerilIcon;
import com.hedvig.app.MainApplication;
import com.hedvig.app.react.OfferChatOverlayFragment;

import timber.log.Timber;

class ActivityStarterModule extends ReactContextBaseJavaModule {

    ActivityStarterModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ActivityStarter";
    }

    @ReactMethod
    void navigateToOfferFromChat() {
        Activity activity = getReactApplicationContext().getCurrentActivity();
        if (activity != null) {
            Navigation.findNavController(activity, com.hedvig.app.common.R.id.rootNavigationHost).navigate(com.hedvig.app.common.R.id.action_chatFragment_to_offerFragment);
        }
    }

    @ReactMethod
    void showOfferChatOverlay() {
        OfferChatOverlayFragment offerChatOverlayFragment = new OfferChatOverlayFragment();
        offerChatOverlayFragment.show(getFragmentManager(), "OfferChatOverlay");
    }

    @ReactMethod
    void showPerilOverlay(@NonNull String subject, @NonNull String iconId, @NonNull String title, @NonNull String description) {
        PerilBottomSheet.Companion.newInstance(subject, PerilIcon.INSTANCE.from(iconId), title, description).show(getFragmentManager(), "perilSheet");
    }

    private FragmentManager getFragmentManager() {
        return ((FragmentActivity) getReactApplicationContext().getCurrentActivity()).getSupportFragmentManager();
    }

    @ReactMethod
    void getActivityName(@NonNull Callback callback) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            callback.invoke(activity.getClass().getSimpleName());
        } else {
            callback.invoke("No current activity");
        }
    }

    @ReactMethod
    void getActivityNameAsPromise(@NonNull Promise promise) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            promise.resolve(activity.getClass().getSimpleName());
        } else {
            promise.reject("NO_ACTIVITY", "No current activity");
        }
    }

    @ReactMethod
    void callJavaScript() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            MainApplication application = (MainApplication) activity.getApplication();
            ReactNativeHost reactNativeHost = application.getReactNativeHost();
            ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
            ReactContext reactContext = reactInstanceManager.getCurrentReactContext();

            if (reactContext != null) {
                CatalystInstance catalystInstance = reactContext.getCatalystInstance();
                WritableNativeArray params = new WritableNativeArray();
                params.pushString("Hello, JavaScript!");

                catalystInstance.callFunction("JavaScriptVisibleToJava", "alert", params);
            }
        }
    }
}