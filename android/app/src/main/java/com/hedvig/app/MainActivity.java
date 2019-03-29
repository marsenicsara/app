package com.hedvig.app;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks;
import com.google.firebase.dynamiclinks.PendingDynamicLinkData;
import com.reactnativenavigation.NavigationActivity;

import io.branch.rnbranch.RNBranchModule;

public class MainActivity extends NavigationActivity {
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
}
