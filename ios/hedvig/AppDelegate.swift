import Foundation
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?
    
    func application(
        _: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
        ) -> BooleanLiteralType {
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
        
        ReactNativeNavigation.bootstrap(jsCodeLocation, launchOptions: launchOptions)
        
        TestComponent.register()
        
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
