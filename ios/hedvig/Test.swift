//
//  Test.swift
//  hedvig
//
//  Created by Sam Pettersson on 2018-11-21.
//  Copyright © 2018 650 Industries, Inc. All rights reserved.
//

import Foundation

struct TestComponent {
    static func register() {
        ReactNativeNavigation.registerExternalComponent("test") { (hashable, bridge) -> UIViewController? in
            let viewController = UIViewController()
            let navigationController = UINavigationController(rootViewController: viewController)
            
            viewController.title = "Test component here"
            viewController.navigationController?.navigationBar.isHidden = false
            viewController.navigationController?.navigationBar.barTintColor = HedvigColors.pink
            
            return navigationController
        }
    }
}
