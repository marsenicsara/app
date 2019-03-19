//
//  RCTApolloClient.swift
//  hedvig
//
//  Created by Sam Pettersson on 2019-01-29.
//  Copyright © 2019 Hedvig AB. All rights reserved.
//

import Apollo
import Flow
import Foundation

struct RCTApolloClient {
    static func getClient() -> Future<(ApolloClient, ApolloStore)> {
        let environment = HedvigApolloEnvironmentConfig(
            endpointURL: URL(string: ReactNativeConfig.env(for: "GRAPHQL_URL"))!,
            wsEndpointURL: URL(string: ReactNativeConfig.env(for: "WS_GRAPHQL_URL"))!
        )

        let token = Future<String?> { completion in
            let rctSenderBlock = { response in
                guard let response = response else { return }
                var value = ""

                if response.count > 1 {
                    var response1 = response[1] as! [Any]
                    if response1.count > 0 {
                        var response2 = response1[0] as! [Any]

                        if response2.count > 1 {
                            if let string = response2[1] as? String {
                                value = string
                            }
                        }
                    }
                }

                completion(.success(value))
            } as RCTResponseSenderBlock

            RCTAsyncLocalStorage().multiGet(["@hedvig:token"], callback: rctSenderBlock)

            return NilDisposer()
        }

        // we get a black screen flicker without the delay
        let clientFuture = token.flatMap { token -> Future<(ApolloClient, ApolloStore)> in
            guard let token = token else {
                let initClient = HedvigApolloClient.shared.initClient(environment: environment)

                // set the new token created by initClient in React Native's async storage
                // so that we don't create another session later on
                initClient.onValue({ _ in
                    guard let token = HedvigApolloClient.shared.retreiveToken() else {
                        return
                    }

                    let rctSenderBlock = { _ in } as RCTResponseSenderBlock
                    RCTAsyncLocalStorage().multiSet(
                        [["@hedvig:token", token.token]],
                        callback: rctSenderBlock
                    )
                })

                return initClient
            }

            return HedvigApolloClient.shared.createClient(
                token: token,
                environment: environment
            )
        }

        clientFuture.onValue { client, store in
            HedvigApolloClient.shared.client = client
            HedvigApolloClient.shared.store = store
            
            
            client.fetch(query: MemberIdQuery()).onValue { response in
                if let memberId = response.data?.member.id {
                    Analytics.setUserID(memberId)
                }
            }
        }

        return clientFuture
    }
}
