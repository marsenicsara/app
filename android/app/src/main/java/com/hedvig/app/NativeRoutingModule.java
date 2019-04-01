package com.hedvig.app;


import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Pair;

import com.apollographql.apollo.ApolloClient;
import com.apollographql.apollo.rx2.Rx2Apollo;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.firestore.FirebaseFirestore;
import com.hedvig.android.owldroid.graphql.MemberIdQuery;
import com.hedvig.android.owldroid.ui.marketing.MarketingFragment;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import io.reactivex.disposables.Disposable;
import timber.log.Timber;

public class NativeRoutingModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private final ApolloClient apolloClient;
    private HashMap<String, String> componentIds2 = new HashMap<>();

    private final MarketingBroadcastReceiver marketingBroadcastReceiver = new MarketingBroadcastReceiver();
    private final ProfileBroadcastReceiver profileBroadcastReceiver = new ProfileBroadcastReceiver();

    private LocalBroadcastManager localBroadcastManager;

    NativeRoutingModule(ReactApplicationContext reactContext, ApolloClient apolloClient) {
        super(reactContext);
        this.apolloClient = apolloClient;

        localBroadcastManager = LocalBroadcastManager.getInstance(reactContext);
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "NativeRouting";
    }

    @Override
    public void onHostResume() {
        localBroadcastManager.registerReceiver(marketingBroadcastReceiver, new IntentFilter("marketingResult"));
        localBroadcastManager.registerReceiver(profileBroadcastReceiver, new IntentFilter("profileNavigation"));
    }

    @Override
    public void onHostPause() {
        localBroadcastManager.unregisterReceiver(marketingBroadcastReceiver);
        localBroadcastManager.unregisterReceiver(profileBroadcastReceiver);
    }

    @Override
    public void onHostDestroy() {

    }

    @ReactMethod
    public void appHasLoaded() {
    }

    @ReactMethod
    public void registerExternalComponentId(String componentId, String componentName) {
        componentIds2.put(componentName, componentId);
    }

    @ReactMethod
    public void userDidSign() {
        SharedPreferences referralsStorage = getCurrentActivity().getSharedPreferences("referrals", Context.MODE_PRIVATE);
        String referee = referralsStorage
            .getString("referee", null);
        String incentive = referralsStorage
                .getString("incentive", null);

        if (referee == null || incentive == null) {
            return;
        }

        MemberIdQuery memberIdQuery = new MemberIdQuery();
        final Disposable disposer = Rx2Apollo.from(apolloClient.query(memberIdQuery)).subscribe((response) -> {
            MemberIdQuery.Data data = response.data();
            if (data == null) {
                Timber.e("Data was null when trying to accredit referral");
                return;
            }
            MemberIdQuery.Member member = data.member();
            String memberId = member.id();
            if (memberId == null) {
                Timber.e("memberId was null when trying to accredit referral");
                return;
            }

            Bundle b = new Bundle();
            b.putString("invitedByMemberId", referee);
            b.putString("memberId", memberId);
            b.putString("incentive", incentive);

            FirebaseAnalytics
                    .getInstance(getReactApplicationContext())
                    .logEvent("referrals_sign", b);

            HashMap<String, String> referralParameters = new HashMap<>();
            referralParameters.put("invitedByMemberId", referee);
            referralParameters.put("memberId", memberId);
            referralParameters.put("incentive", incentive);
            referralParameters.put("timestamp", Long.toString(new Date().getTime()));

            FirebaseFirestore
                    .getInstance()
                    .collection("referrals")
                    .add(referralParameters)
                    .addOnSuccessListener((document) -> {
                        Timber.i("Successfully saved referral!");
                    })
                    .addOnFailureListener((error) -> {
                        Timber.e(error, "Failed to save referral");
                    });

        }, (error) -> Timber.e(error, "Failed to load memberId for referral"));

    }

    private void sendMarketingResult(@NotNull MarketingFragment.MarketingResult marketingResult) {
        WritableMap message = Arguments.createMap();
        message.putString("marketingResult", marketingResult.toString());
        String componentId = componentIds2.get("marketingScreen");
        if (componentId == null) {
            throw new RuntimeException("Marketing Screen not registered in NativeRoutingModule");
        }
        message.putString("componentId", componentId);
        getDeviceEventEmitter().emit("NativeRoutingMarketingResult", message);
    }

    private DeviceEventManagerModule.RCTDeviceEventEmitter getDeviceEventEmitter() {
        return getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }

    private void clearDirectDebitStatus() {
        getDeviceEventEmitter().emit("NativeRoutingClearDirectDebitStatus", null);
    }

    private void startChat() {
        getDeviceEventEmitter().emit("NativeRoutingOpenFreeTextChat", null);
    }

    private void logout() {
        getDeviceEventEmitter().emit("NativeRoutingLogout", null);
    }

    private class MarketingBroadcastReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            sendMarketingResult(((MarketingFragment.MarketingResult) intent.getSerializableExtra("type")));
        }
    }

    private class ProfileBroadcastReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getStringExtra("action");
            switch (action) {
                case "clearDirectDebitStatus": {
                    clearDirectDebitStatus();
                    break;
                }
                case "chat": {
                    startChat();
                    break;
                }
                case "logout": {
                    logout();
                    break;
                }
                default: break;
            }
        }
    }
}
