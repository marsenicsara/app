package com.hedvig.app;

import android.content.Intent;

import com.reactnativenavigation.NavigationActivity;

import io.branch.rnbranch.RNBranchModule;

public class MainActivity extends NavigationActivity {
    @Override
    protected void onStart() {
        super.onStart();
        RNBranchModule.initSession(getIntent().getData(), this);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
}
