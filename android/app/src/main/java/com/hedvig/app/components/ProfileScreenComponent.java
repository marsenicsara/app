package com.hedvig.app.components;

import android.support.v4.app.FragmentActivity;
import android.view.View;
import android.widget.FrameLayout;

import com.hedvig.app.R;
import com.reactnativenavigation.viewcontrollers.externalcomponent.ExternalComponent;

public class ProfileScreenComponent implements ExternalComponent {
    private final FrameLayout component;

    ProfileScreenComponent(FragmentActivity activity) {
        component = new FrameLayout(activity);
        View content = activity.getLayoutInflater().inflate(R.layout.profile_navigation_host, component, false);
        content.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
        component.addView(content);

        component.setId(R.id.profile_screen_content);
    }

    @Override
    public View asView() {
        return component;
    }
}
