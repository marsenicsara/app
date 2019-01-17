package com.hedvig.app.components;

import android.support.v4.app.FragmentActivity;

import com.facebook.react.ReactInstanceManager;
import com.reactnativenavigation.viewcontrollers.externalcomponent.ExternalComponent;
import com.reactnativenavigation.viewcontrollers.externalcomponent.ExternalComponentCreator;

import org.json.JSONObject;

public class MyInfoComponentCreator implements ExternalComponentCreator {
    @Override
    public ExternalComponent create(FragmentActivity activity, ReactInstanceManager reactInstanceManager, JSONObject props) {
        return new MyInfoComponent(activity);
    }
}
