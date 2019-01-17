package com.hedvig.app.components;

import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.view.View;
import android.widget.FrameLayout;

import com.hedvig.android.owldroid.ui.profile.myinfo.MyInfoFragment;
import com.hedvig.app.R;
import com.reactnativenavigation.viewcontrollers.externalcomponent.ExternalComponent;

class MyInfoComponent implements ExternalComponent {
    private final FrameLayout component;

    public MyInfoComponent(FragmentActivity activity) {
        component = new FrameLayout(activity) {
            @Override
            protected void onAttachedToWindow() {
                super.onAttachedToWindow();
                FragmentManager fragmentManager = activity.getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

                fragmentTransaction.add(R.id.profile_member_info_screen_content, new MyInfoFragment());
                fragmentTransaction.commitAllowingStateLoss();
            }
        };

        component.setId(R.id.profile_member_info_screen_content);
    }

    @Override
    public View asView() {
        return component;
    }
}
