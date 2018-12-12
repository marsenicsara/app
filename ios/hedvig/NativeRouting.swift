//
//  NativeRouting.swift
//  hedvig
//
//  Created by Sam Pettersson on 2018-12-06.
//  Copyright © 2018 Hedvig AB. All rights reserved.
//

import Foundation
import Flow

@objc(NativeRouting)
class NativeRouting: RCTEventEmitter {
    let appHasLoadedCallbacker: Callbacker<Void>
    let appHasLoadedSignal: Signal<Void>
    
    override init() {
        appHasLoadedCallbacker = Callbacker<Void>()
        appHasLoadedSignal = appHasLoadedCallbacker.signal()
        super.init()
    }
    
    override func supportedEvents() -> [String]! {
        return ["NativeRoutingMarketingResult", "NativeRoutingAppHasLoaded"]
    }
    
    func sendMarketingResult(marketingResult: MarketingResult) {
        let marketingResultString = marketingResult == .onboard ? "onboard" : "login"
        self.sendEvent(withName: "NativeRoutingMarketingResult", body: marketingResultString)
    }
    
    @objc func appHasLoaded() {
        appHasLoadedCallbacker.callAll()
    }
}
