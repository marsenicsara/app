//
//  NativeRouting.swift
//  hedvig
//
//  Created by Sam Pettersson on 2018-12-06.
//  Copyright © 2018 Hedvig AB. All rights reserved.
//

import Flow
import Foundation

struct MarketingResultEventBody: Encodable {
    var marketingResult: String?
    var componentId: String?
}

@objc(NativeRouting)
class NativeRouting: RCTEventEmitter {
    let appHasLoadedCallbacker: Callbacker<Void>
    let appHasLoadedSignal: Signal<Void>
    var componentIds: Array<(componentId: String, componentName: String)> = []

    override init() {
        appHasLoadedCallbacker = Callbacker<Void>()
        appHasLoadedSignal = appHasLoadedCallbacker.signal()
        super.init()
    }

    override func supportedEvents() -> [String]! {
        return ["NativeRoutingMarketingResult", "NativeRoutingAppHasLoaded", "NativeRoutingOpenFreeTextChat"]
    }

    func sendMarketingResult(marketingResult: MarketingResult) {
        let marketingResultString = marketingResult == .onboard ? "onboard" : "login"

        let tuple = componentIds.filter { (_: String, componentName: String) -> Bool in
            if componentName == "marketingScreen" {
                return true
            }

            return false
        }.last

        if let componentId = tuple?.componentId {
            sendEvent(withName: "NativeRoutingMarketingResult", body: [
                "marketingResult": marketingResultString,
                "componentId": componentId
            ])
        }
    }

    func sendOpenFreeTextChat() {
        sendEvent(withName: "NativeRoutingOpenFreeTextChat", body: [])
    }

    @objc func appHasLoaded() {
        appHasLoadedCallbacker.callAll()
    }

    @objc func registerExternalComponentId(_ componentId: String, componentName componentNameString: String) {
        componentIds.append((componentId: componentId, componentName: componentNameString))
    }
}
