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

            if viewController.debugPresentationTitle == "LoggedIn" {
                Analytics.setUserProperty("true", forName: "isMember")
            }
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

        DefaultStyling.installCustom()

        loadApolloAndReactNative(
            hasLoadedCallbacker: hasLoadedCallbacker,
            launchOptions: launchOptions
        )

        return true
    }

    func loadApolloAndReactNative(
        hasLoadedCallbacker: Callbacker<Void>? = nil,
        launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
    ) {
        var jsCodeLocation: URL

        #if DEBUG
            jsCodeLocation = RCTBundleURLProvider.sharedSettings()!.jsBundleURL(
                forBundleRoot: "index",
                fallbackResource: nil
            )
            hasLoadedCallbacker?.callAll()
        #else
            jsCodeLocation = CodePush.bundleURL()
        #endif

        RCTApolloClient.getClient().delay(by: 0.05).onValue { client, _ in
            ReactNativeNavigation.bootstrapBrownField(
                jsCodeLocation,
                launchOptions: launchOptions,
                bridgeManagerDelegate: nil,
                window: self.window
            )

            let bridge = ReactNativeNavigation.getBridge()

            self.window?.makeKeyAndVisible()

            let nativeRouting = bridge?.module(forName: "NativeRouting") as! NativeRouting

            self.bag += nativeRouting.appHasLoadedSignal.onValue({ _ in
                hasLoadedCallbacker?.callAll()
            })

            MarketingScreenComponent.register(client: client)
            LoggedInScreenComponent.register(client: client)
        }
    }

    func logout() {
        window?.makeKeyAndVisible()
        ReactNativeNavigation.getBridge()?.invalidate()
        bag.dispose()
        RCTAsyncLocalStorage().clearAllData()
        loadApolloAndReactNative()
    }

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
