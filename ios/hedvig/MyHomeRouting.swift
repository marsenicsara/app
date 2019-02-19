//
//  MyHomeRouting.swift
//  hedvig
//
//  Created by Sam Pettersson on 2019-02-18.
//  Copyright © 2019 Hedvig AB. All rights reserved.
//

import Foundation

struct MyHomeRouting {
    static func openChat(viewController _: UIViewController) {
        let bridge = ReactNativeNavigation.getBridge()
        let nativeRouting = bridge?.module(forName: "NativeRouting") as! NativeRouting
        nativeRouting.sendOpenFreeTextChat()
    }
}
