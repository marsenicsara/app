package com.hedvig.app

import com.apollographql.apollo.ApolloClient
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

import java.util.Arrays
import java.util.Collections

class NativeRoutingPackage internal constructor(private val apolloClient: ApolloClient) : ReactPackage {

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return Arrays.asList<NativeModule>(NativeRoutingModule(reactContext, apolloClient))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
