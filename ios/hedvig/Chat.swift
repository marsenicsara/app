//
//  Chat.swift
//  hedvig
//
//  Created by Sam Pettersson on 2019-02-18.
//  Copyright © 2019 Hedvig AB. All rights reserved.
//

import Flow
import Form
import Presentation
import UIKit

struct Chat {}

extension Chat: Presentable {
    func materialize() -> (UIViewController, Disposable) {
        let bag = DisposeBag()

        let viewController = UIViewController()

        viewController.view = RNNReactView(
            bridge: ReactNativeNavigation.getBridge(),
            moduleName: "ChatScreen",
            initialProperties: ["componentId": "1", "intent": "onboarding"]
        )

        return (viewController, bag)
    }
}
