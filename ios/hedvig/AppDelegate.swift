import Apollo
import CommonCrypto
import Firebase
import Flow
import Form
import Foundation
import Presentation
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    let bag = DisposeBag()
    var window: UIWindow? = UIWindow(frame: UIScreen.main.bounds)
    var splashWindow: UIWindow? = UIWindow(frame: UIScreen.main.bounds)

    func application(
        _: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> BooleanLiteralType {
        viewControllerWasPresented = { viewController in
            let mirror = Mirror(reflecting: viewController)
            Analytics.setScreenName(
                viewController.debugPresentationTitle,
                screenClass: String(describing: mirror.subjectType)
            )
        }

        let rootNavigationController = UINavigationController()
        rootNavigationController.setNavigationBarHidden(true, animated: false)
        rootNavigationController.view = { () -> UIView in
            let view = UIView()
            view.backgroundColor = UIColor.white
            return view
        }()
        window?.rootViewController = rootNavigationController
        window?.windowLevel = .normal
        window?.backgroundColor = UIColor.white
        window?.makeKeyAndVisible()

        let splashNavigationController = UINavigationController()
        splashWindow?.rootViewController = splashNavigationController
        splashNavigationController.setNavigationBarHidden(true, animated: false)
        splashNavigationController.view = { () -> UIView in
            let view = UIView()
            view.backgroundColor = UIColor.clear
            return view
        }()
        splashWindow?.isOpaque = false
        splashWindow?.backgroundColor = UIColor.clear
        splashWindow?.windowLevel = .alert
        splashWindow?.makeKeyAndVisible()

        FirebaseApp.configure()
        RNFirebaseNotifications.configure()

        RNBranch.initSession(launchOptions: launchOptions, isReferrable: true)

        let hasLoadedCallbacker = Callbacker<Void>()

        let launch = Launch(
            hasLoadedSignal: hasLoadedCallbacker.signal()
        )

        let launchPresentation = Presentation(
            launch,
            style: .modally(
                presentationStyle: .overCurrentContext,
                transitionStyle: .none,
                capturesStatusBarAppearance: true
            ),
            options: [.unanimated, .prefersNavigationBarHidden(true)]
        )

        bag += splashNavigationController.present(launchPresentation).onValue({ _ in
            self.splashWindow = nil
        })

        var jsCodeLocation: URL

        #if DEBUG
            jsCodeLocation = RCTBundleURLProvider.sharedSettings()!.jsBundleURL(
                forBundleRoot: "index",
                fallbackResource: nil
            )
        #else
            jsCodeLocation = CodePush.bundleURL()
        #endif

        RNSentry.install(with: ReactNativeNavigation.getBridge())

        let environment = HedvigApolloEnvironmentConfig(
            endpointURL: URL(string: ReactNativeConfig.env(for: "GRAPHQL_URL"))!,
            wsEndpointURL: URL(string: ReactNativeConfig.env(for: "WS_GRAPHQL_URL"))!
        )

        DefaultStyling.installCustom()

        let token = Future<String?> { completion in
            let rctSenderBlock = { response in
                guard let response = response else { return }
                var value = ""

                if response.count > 1 {
                    var response1 = response[1] as! [Any]
                    if response1.count > 0 {
                        var response2 = response1[0] as! [Any]

                        if (response2.count) > 1 {
                            value = response2[1] as! String
                        }
                    }
                }

                completion(.success(value))
            } as RCTResponseSenderBlock

            RCTAsyncLocalStorage().multiGet(["@hedvig:token"], callback: rctSenderBlock)

            return NilDisposer()
        }

        // we get a black screen flicker without the delay
        token.flatMap { token -> Future<ApolloClient> in
            HedvigApolloClient.shared.createClient(token: token, environment: environment)
        }.delay(by: 0.05).onValue { client in
            HedvigApolloClient.shared.client = client

            ReactNativeNavigation.bootstrapBrownField(
                jsCodeLocation,
                launchOptions: launchOptions,
                bridgeManagerDelegate: nil,
                window: self.window
            )

            let bridge = ReactNativeNavigation.getBridge()

            let nativeRouting = bridge?.module(forName: "NativeRouting") as! NativeRouting

            self.bag += nativeRouting.appHasLoadedSignal.onValue({ _ in
                hasLoadedCallbacker.callAll()
            })

            MarketingScreenComponent.register(client: client)
            LoggedInScreenComponent.register(client: client)
        }

        return true
    }

    func logout() {}

    func application(_: UIApplication, didReceive notification: UILocalNotification) {
        RNFirebaseNotifications.instance().didReceive(notification)
    }

    func application(_: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        RNFirebaseNotifications.instance().didReceiveRemoteNotification(userInfo, fetchCompletionHandler: completionHandler)
    }

    func application(_: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
        RNFirebaseMessaging.instance().didRegister(notificationSettings)
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> BooleanLiteralType {
        if !RNBranch.branch.application(app, open: url, options: options) {
            return true
        }

        return true
    }

    func application(_: UIApplication, continue userActivity: NSUserActivity, restorationHandler _: @escaping ([UIUserActivityRestoring]?) -> Void) -> BooleanLiteralType {
        return RNBranch.continue(userActivity)
    }
}
