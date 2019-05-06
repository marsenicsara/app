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
    func materialize() -> (UIViewController, Future<Void>) {
        let bag = DisposeBag()

        let viewController = UIViewController()
        viewController.preferredContentSize = CGSize(width: 0, height: UIScreen.main.bounds.height - 80)

        let closeButton = UIBarButtonItem()
        closeButton.image = Asset.close.image
        closeButton.tintColor = .darkGray

        viewController.navigationItem.leftBarButtonItem = closeButton

        let titleHedvigLogo = UIImageView()
        titleHedvigLogo.image = Asset.wordmark.image
        titleHedvigLogo.contentMode = .scaleAspectFit

        viewController.navigationItem.titleView = titleHedvigLogo

        titleHedvigLogo.snp.makeConstraints { make in
            make.width.equalTo(80)
        }

        viewController.view = RNNReactView(
            bridge: ReactNativeNavigation.getBridge(),
            moduleName: "ChatScreen",
            initialProperties: ["componentId": "1", "intent": "onboarding"]
        )

        return (viewController, Future { completion in
            bag += closeButton.onValue {
                completion(.success)
            }

            return bag
        })
    }
}
