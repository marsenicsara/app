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

extension UIView {
    func findSubview(accessibilityLabel: String) -> UIView? {
        for subview in subviews {
            print(subview.accessibilityLabel)

            if subview.accessibilityLabel == accessibilityLabel {
                return subview
            }

            if let foundView = subview.findSubview(
                accessibilityLabel: accessibilityLabel
            ) {
                return foundView
            }
        }

        return nil
    }
}

class FABContainerView: UIView {
    override func point(inside: CGPoint, with: UIEvent?) -> Bool {
        let view = findSubview(accessibilityLabel: "Floating Action Button")!
        let point = convert(inside, to: view)

        let parentView = view.parent!.subviews[1]
        let parentPoint = convert(inside, to: parentView)

        return view.point(
            inside: point,
            with: with
        ) || parentView.point(
            inside: parentPoint,
            with: with
        )
    }
}

struct LoggedInScreenComponent {
    static func register(client: ApolloClient) {
        ReactNativeNavigation.registerExternalComponent("loggedInScreen") { (_, _) -> UIViewController? in

            var resultingViewController: UIViewController?

            RCTApolloClient.getClient().onValue({ client in
                let loggedIn = LoggedIn(
                    client: client
                )

                let (viewController, disposable) = loggedIn.materialize()

                let containerView = FABContainerView()
                containerView.frame = viewController.view.frame

                let fabView = RNNReactView(
                    bridge: ReactNativeNavigation.getBridge(),
                    moduleName: "FABComponent",
                    initialProperties: ["componentId": "2"]
                )
                fabView?.frame = viewController.view.frame
                fabView?.backgroundColor = UIColor.clear

                containerView.addSubview(fabView!)
                viewController.view.addSubview(containerView)

                (UIApplication.shared.delegate as! AppDelegate).bag += disposable

                resultingViewController = viewController
            })

            return resultingViewController
        }
    }
}
