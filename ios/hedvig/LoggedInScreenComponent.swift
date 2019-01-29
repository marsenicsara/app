//
//  LoggedInScreenComponent.swift
//  hedvig
//
//  Created by Sam Pettersson on 2019-01-28.
//  Copyright © 2019 Hedvig AB. All rights reserved.
//

import Apollo
import Foundation
import Presentation
import Flow

struct LoggedInScreenComponent {
    static func register(client: ApolloClient) {
        ReactNativeNavigation.registerExternalComponent("loggedInScreen") { (hashable, bridge) -> UIViewController? in
            let loggedIn = LoggedIn(
                client: client
            )
            
            let (viewController, disposable) = loggedIn.materialize()
            
            (UIApplication.shared.delegate as! AppDelegate).bag += disposable
            
            return viewController
        }
    }
}

