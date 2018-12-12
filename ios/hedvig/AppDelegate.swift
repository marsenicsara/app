import Foundation
import UIKit
import CommonCrypto
import Presentation
import Flow

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    let bag = DisposeBag()
    let navigationController = UINavigationController()
    var window: UIWindow? = UIWindow(frame: UIScreen.main.bounds)
    var splashWindow: UIWindow? = UIWindow(frame: UIScreen.main.bounds)
    
    func application(
        _: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
        ) -> BooleanLiteralType {
        splashWindow?.rootViewController = navigationController
        navigationController.setNavigationBarHidden(true, animated: false)
        navigationController.view = { () -> UIView in
            let view = UIView()
            view.backgroundColor = UIColor.clear
            return view
        }()
        splashWindow?.isOpaque = false
        splashWindow?.backgroundColor = UIColor.clear
        
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
        
        self.bag += self.navigationController.present(launchPresentation).onValue({ _ in
            self.splashWindow = nil
            self.window?.makeKeyAndVisible()
        })
        self.splashWindow?.makeKeyAndVisible()
        
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
        
        HedvigApolloClient.shared.initClient().onValue { client in
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
            
            self.window?.makeKeyAndVisible()
            self.splashWindow?.makeKeyAndVisible()
            MarketingScreenComponent.register(client: client)
        }
        
        return true
    }
    
    func application(_ application: UIApplication, didReceive notification: UILocalNotification) {
        RNFirebaseNotifications.instance().didReceive(notification)
    }
    
    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        RNFirebaseNotifications.instance().didReceiveRemoteNotification(userInfo, fetchCompletionHandler: completionHandler)
    }
    
    func application(_ application: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
        RNFirebaseMessaging.instance().didRegister(notificationSettings)
    }
    
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> BooleanLiteralType {
        if (!RNBranch.branch.application(app, open: url, options: options)) {
            return true
        }
        
        return true
    }
    
    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> BooleanLiteralType {
        return RNBranch.continue(userActivity)
    }
    
}
