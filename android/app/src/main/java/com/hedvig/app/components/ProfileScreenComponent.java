package com.hedvig.app.components;

import android.content.Intent;
import android.support.v4.app.FragmentActivity;
import android.support.v4.content.LocalBroadcastManager;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.FrameLayout;

import com.hedvig.app.R;
import com.reactnativenavigation.viewcontrollers.externalcomponent.ExternalComponent;

public class ProfileScreenComponent implements ExternalComponent {
    private final FrameLayout component;

    ProfileScreenComponent(FragmentActivity activity) {
        component = new FrameLayout(activity);
        View content = activity.getLayoutInflater().inflate(R.layout.profile_navigation_host, component, false);
        content.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
        content.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            @Override
            public void onGlobalLayout() {
                LocalBroadcastManager localBroadcastManager = LocalBroadcastManager.getInstance(activity);
                Intent intent = new Intent("profileScreenDidAppear");
                localBroadcastManager.sendBroadcast(intent);
                content.getViewTreeObserver().removeOnGlobalLayoutListener(this);
            }
        });
        component.addView(content);

        component.setId(R.id.profile_screen_content);
    }

    @Override
    public View asView() {
        return component;
    }
}
