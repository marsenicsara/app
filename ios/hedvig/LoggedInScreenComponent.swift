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
    static func register(client: ApolloClient) {
        ReactNativeNavigation.registerExternalComponent("loggedInScreen") { (_, _) -> UIViewController? in

            var resultingViewController: UIViewController?

            RCTApolloClient.getClient().onValue({ client in                
                let loggedIn = LoggedIn(
                    client: client
                )

                let (viewController, disposable) = loggedIn.materialize()

                (UIApplication.shared.delegate as! AppDelegate).bag += disposable

                resultingViewController = viewController
            })

            return resultingViewController
        }
    }
}
