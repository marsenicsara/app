//
//  NativeRouting.swift
//  hedvig
//
//  Created by Sam Pettersson on 2018-12-06.
//  Copyright © 2018 Hedvig AB. All rights reserved.
//

import Foundation

@objc(NativeRouting)
class NativeRouting: RCTEventEmitter {
    override func supportedEvents() -> [String]! {
        return ["NativeRoutingMarketingResult"]
    }
    
    func sendMarketingResult(marketingResult: MarketingResult) {
        let marketingResultString = marketingResult == .onboard ? "onboard" : "login"
        self.sendEvent(withName: "NativeRoutingMarketingResult", body: marketingResultString)
    }
}
