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
    static func register(client: ApolloClient) {
        ReactNativeNavigation.registerExternalComponent("marketingScreen") { (_, bridge) -> UIViewController? in
            let navigationController = UINavigationController()

            let marketing = Marketing(
                client: client
            )

            let marketingPresentation = Presentation<Marketing>(
                marketing,
                style: .marketing,
                options: .unanimated
            ).onValue { marketingResult in
                let nativeRouting = bridge?.module(forName: "NativeRouting") as! NativeRouting
                nativeRouting.sendMarketingResult(marketingResult: marketingResult)
            }

            navigationController.present(marketingPresentation)

            if let statusBar = UIApplication.shared.value(forKey: "statusBar") as? UIView {
                statusBar.setValue(UIColor.white, forKey: "foregroundColor")
            }

            return navigationController
        }
    }
}
