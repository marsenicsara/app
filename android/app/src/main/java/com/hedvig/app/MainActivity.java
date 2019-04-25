package com.hedvig.app;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.NotificationManagerCompat;
import android.support.v7.app.AlertDialog;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactFragmentActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.devsupport.interfaces.DevOptionHandler;
import com.facebook.react.devsupport.interfaces.DevSupportManager;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks;
import io.branch.rnbranch.RNBranchModule;

public class MainActivity extends ReactFragmentActivity {
    @Override
    protected void onStart() {
        super.onStart();
        RNBranchModule.initSession(getIntent().getData(), this);

        FirebaseDynamicLinks
                .getInstance()
                .getDynamicLink(getIntent())
                .addOnSuccessListener(pendingDynamicLinkData -> {
                    if (pendingDynamicLinkData != null && pendingDynamicLinkData.getLink() != null) {
                        Uri link = pendingDynamicLinkData.getLink();
                        String referee = link.getQueryParameter("memberId");
                        String incentive = link.getQueryParameter("incentive");
                        if (referee != null && incentive != null) {
                            getSharedPreferences("referrals", Context.MODE_PRIVATE)
                                    .edit()
                                    .putString("referee", referee)
                                    .putString("incentive", incentive)
                                    .apply();

                            Bundle b = new Bundle();
                            b.putString("invitedByMemberId", referee);
                            b.putString("incentive", incentive);

                            FirebaseAnalytics
                                    .getInstance(this)
                                    .logEvent("referrals_open", b);
                        }
                    }
                });
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    protected void onPause() {
        getReactInstanceManager().onHostPause(this);
        super.onPause();
    }

    @Override
    protected void onResume() {
        getReactInstanceManager().onHostResume(this, this);
        super.onResume();
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.root_navigation_host);

        MainApplication application = (MainApplication) getApplication();
        ReactNativeHost reactNativeHost = application.getReactNativeHost();
        ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
        DevSupportManager devSupportManager = reactInstanceManager.getDevSupportManager();

        devSupportManager.addCustomDevOption("Custom dev option", new DevOptionHandler() {
            @Override
            public void onOptionSelected() {
                if (NotificationManagerCompat.from(MainActivity.this).areNotificationsEnabled()) {
                    Toast.makeText(MainActivity.this, "Dev opt", Toast.LENGTH_LONG).show();
                } else {
                    AlertDialog dialog = new AlertDialog.Builder(MainActivity.this).create();
                    dialog.setTitle("Dev option");
                    dialog.setMessage("Dev opt");
                    dialog.show();
                }
            }
        });
    }
}
