package com.hedvig.app;


import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Pair;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.hedvig.android.owldroid.ui.marketing.MarketingFragment;

import java.util.ArrayList;
import java.util.List;

public class NativeRoutingModule extends ReactContextBaseJavaModule {
    private List<Pair<String, String>> componentIds;
    private final LocalBroadcastReceiver localBroadcastReceiver;

    public NativeRoutingModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.componentIds = new ArrayList<>();
        this.localBroadcastReceiver = new LocalBroadcastReceiver();
        LocalBroadcastManager localBroadcastManager = LocalBroadcastManager.getInstance(reactContext);
        localBroadcastManager.registerReceiver(localBroadcastReceiver, new IntentFilter("marketingResult"));
    }

    @Override
    public String getName() {
        return "NativeRouting";
    }

    @ReactMethod
    public void appHasLoaded() {
    }

    @ReactMethod
    public void registerExternalComponentId(String componentId, String componentName) {
        componentIds.add(new Pair<>(componentId, componentName));
    }

    public void sendMarketingResult(MarketingFragment.MarketingResult marketingResult) {
        WritableMap message = Arguments.createMap();
        message.putString("marketingResult", marketingResult.toString());
        String componentId = null;
        for (Pair<String, String> p : componentIds) {
            if (p.second.equals("marketingScreen")) {
                componentId = p.first;
                break;
            }
        }
        if (componentId == null) {
            throw new RuntimeException("Marketing Screen not registered in NativeRoutingModule");
        }
        message.putString("componentId", componentId);
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("NativeRoutingMarketingResult", message);
    }

    public class LocalBroadcastReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            sendMarketingResult(((MarketingFragment.MarketingResult) intent.getSerializableExtra("type")));
        }
    }
}
