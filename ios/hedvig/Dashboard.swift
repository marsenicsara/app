//
//  Dashboard.swift
//  hedvig
//
//  Created by Sam Pettersson on 2019-01-29.
//  Copyright © 2019 Hedvig AB. All rights reserved.
//

import Apollo
import Flow
import Form
import Presentation
import UIKit

struct Dashboard {
    let client: ApolloClient

    init(client: ApolloClient = HedvigApolloClient.shared.client!) {
        self.client = client
    }
}

extension Dashboard: Presentable {
    func materialize() -> (UIViewController, Disposable) {
        let bag = DisposeBag()

        let viewController = UIViewController()

        bag += client.watch(
            query: DashboardQuery()
        ).compactMap { $0.data?.member.firstName }.map {
            String(.DASHBOARD_BANNER_ACTIVE_TITLE(firstName: $0))
        }.bindTo(viewController, \.navigationItem.title)

        viewController.view = RNNReactView(
            bridge: ReactNativeNavigation.getBridge(),
            moduleName: "DashboardScreen",
            initialProperties: ["componentId": "1"]
        )

        return (viewController, bag)
    }
}

extension Dashboard: Tabable {
    func tabBarItem() -> UITabBarItem {
        return UITabBarItem(
            title: String(.TAB_DASHBOARD_TITLE),
            image: Asset.dashboardTab.image,
            selectedImage: nil
        )
    }
}
