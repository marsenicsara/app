//
//  MarketingScreenComponent.swift
//  hedvig
//
//  Created by Sam Pettersson on 2018-12-05.
//  Copyright © 2018 Hedvig AB. All rights reserved.
//

import Apollo
import Flow
import Foundation
import Presentation

struct MarketingScreenComponent {
    static func register() {
        ReactNativeNavigation.registerExternalComponent("marketingScreen") { (_, bridge) -> UIViewController? in
            let navigationController = UINavigationController()

            let marketing = Marketing()

            let marketingPresentation = Presentation<Marketing>(
                marketing,
                style: .marketing,
                options: .unanimated
            ).onValue { marketingResult in
                let nativeRouting = bridge?.module(forName: "NativeRouting") as! NativeRouting
                nativeRouting.sendMarketingResult(marketingResult: marketingResult)

                if let statusBar = UIApplication.shared.value(forKey: "statusBar") as? UIView {
                    UIView.animate(withDuration: 0.25, animations: {
                        statusBar.setValue(
                            UIColor.black,
                            forKey: "foregroundColor"
                        )
                    })
                }
            }

            navigationController.present(marketingPresentation)

            if let statusBar = UIApplication.shared.value(forKey: "statusBar") as? UIView {
                statusBar.setValue(UIColor.white, forKey: "foregroundColor")
            }

            return navigationController
        }
    }
}
