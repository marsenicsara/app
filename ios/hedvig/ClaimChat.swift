//
//  Chat.swift
//  hedvig
//
//  Created by Sam Pettersson on 2019-02-18.
//  Copyright © 2019 Hedvig AB. All rights reserved.
//

import Apollo
import Flow
import Form
import Presentation
import UIKit

struct ClaimChat {
    let claimTypeId: GraphQLID?
    let client: ApolloClient

    init(claimTypeId: GraphQLID? = nil, client: ApolloClient = ApolloContainer.shared.client) {
        self.claimTypeId = claimTypeId
        self.client = client
    }
}

extension ClaimChat: Presentable {
    func materialize() -> (UIViewController, Disposable) {
        let bag = DisposeBag()

        let viewController = UIViewController()
        viewController.title = "Skadeanmälan"
        viewController.preferredContentSize = CGSize(width: 0, height: UIScreen.main.bounds.height - 50)

        let item = UIBarButtonItem(title: "Avbryt")

        bag += item.onValue { _ in
            viewController.dismiss(animated: true, completion: nil)
        }

        viewController.navigationItem.leftBarButtonItem = item

        let view = UIView()
        view.backgroundColor = .offWhite

        let loaderBag = bag.innerBag()

        let loadingIndicator = LoadingIndicator(showAfter: 0)
        loaderBag += view.add(loadingIndicator)

        let reactView = RNNReactView(
            bridge: ReactNativeNavigation.getBridge(),
            moduleName: "ChatScreen",
            initialProperties: ["componentId": "1", "intent": ""]
        )
        reactView?.isHidden = true

        view.addSubview(reactView!)

        reactView?.snp.makeConstraints { make in
            make.width.equalToSuperview()
            make.height.equalToSuperview()
            make.center.equalToSuperview()
        }

        bag += client.perform(mutation: TriggerClaimChatMutation(claimTypeId: claimTypeId)).valueSignal.compactMap { $0.data?.triggerClaimChat }.onValue { _ in
            reactView?.isHidden = false
            loaderBag.dispose()
        }

        viewController.view = view

        return (viewController, bag)
    }
}
