//
//  ClearDirectDebitStatus.swift
//  hedvig
//
//  Created by Sam Pettersson on 2019-03-13.
//  Copyright © 2019 Hedvig AB. All rights reserved.
//

import Foundation

struct ClearDirectDebitStatus {
    static func clear() {
        let bridge = ReactNativeNavigation.getBridge()
        let nativeRouting = bridge?.module(forName: "NativeRouting") as! NativeRouting
        nativeRouting.sendClearDirectDebitStatus()
    }
}
