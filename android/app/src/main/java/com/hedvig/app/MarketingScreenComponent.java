package com.hedvig.app;

import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.view.View;
import android.widget.FrameLayout;

import com.reactnativenavigation.viewcontrollers.externalcomponent.ExternalComponent;

import com.hedvig.android.app.MarketingFragment;

public class MarketingScreenComponent implements ExternalComponent {
    private final FrameLayout component;

    public MarketingScreenComponent(FragmentActivity activity) {
        component = new FrameLayout(activity) {
            @Override
            protected void onAttachedToWindow() {
                super.onAttachedToWindow();
                FragmentManager fragmentManager = activity.getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.add(R.id.marketing_screen_content, new MarketingFragment());
                fragmentTransaction.commitAllowingStateLoss();
            }
        };

        component.setId(R.id.marketing_screen_content);
    }

    @Override
    public View asView() {
        return component;
    }

}

