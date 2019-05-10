package com.hedvig.app;

import com.apollographql.apollo.ApolloClient;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class NativeRoutingPackage implements ReactPackage {

    private final ApolloClient apolloClient;

    NativeRoutingPackage(ApolloClient apolloClient) {
        this.apolloClient = apolloClient;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.asList(new NativeRoutingModule(reactContext, apolloClient));
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
