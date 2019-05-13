//
//  LoggedInScreenComponent.swift
//  hedvig
//
//  Created by Sam Pettersson on 2019-01-28.
//  Copyright © 2019 Hedvig AB. All rights reserved.
//

import Apollo
import Flow
import Foundation
import Presentation

struct LoggedInScreenComponent {
    static func register() {
        ReactNativeNavigation.registerExternalComponent("loggedInScreen") { (_, _) -> UIViewController? in

            var resultingViewController: UIViewController?

            RCTApolloClient.getClient().onValue { _ in
                let loggedIn = LoggedIn()

                let (viewController, disposable) = loggedIn.materialize()

                if let statusBar = UIApplication.shared.value(forKey: "statusBar") as? UIView {
                    statusBar.setValue(UIColor.black, forKey: "foregroundColor")
                }

                (UIApplication.shared.delegate as! AppDelegate).bag += disposable

                resultingViewController = viewController
            }

            return resultingViewController
        }
    }
}
