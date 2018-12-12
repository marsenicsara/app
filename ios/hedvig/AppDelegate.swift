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
    
    func application(
        _: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
        ) -> BooleanLiteralType {
        window?.rootViewController = navigationController
        FirebaseApp.configure()
        RNFirebaseNotifications.configure()
        
        RNBranch.initSession(launchOptions: launchOptions, isReferrable: true)
        
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
            let launch = Launch()
            
            let launchPresentation = Presentation(
                launch,
                style: .modally(
                    presentationStyle: .overCurrentContext,
                    transitionStyle: .none,
                    capturesStatusBarAppearance: true
                ),
                options: [.unanimated, .prefersNavigationBarHidden(true)]
            )
            
            self.bag += self.navigationController.present(launchPresentation)
            self.window?.makeKeyAndVisible()
            
            ReactNativeNavigation.bootstrapBrownField(
                jsCodeLocation,
                launchOptions: launchOptions,
                bridgeManagerDelegate: nil,
                window: self.window
            )
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
