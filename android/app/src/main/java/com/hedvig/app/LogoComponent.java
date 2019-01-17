package com.hedvig.app;

import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.AppCompatImageView;
import android.view.View;
import android.widget.FrameLayout;

import com.hedvig.android.owldroid.ui.logo.LogoFragment;
import com.reactnativenavigation.viewcontrollers.externalcomponent.ExternalComponent;

public class LogoComponent implements ExternalComponent {
    private final View component;

    public LogoComponent(FragmentActivity activity) {
        component = activity.getLayoutInflater().inflate(R.layout.logo, null);
        component.setId(R.id.logo_content);
    }
    @Override
    public View asView() {
        return component;
    }
}
