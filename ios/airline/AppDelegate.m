/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <TwitterKit/TwitterKit.h>
#import "RNTwitterSignIn.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <RNGoogleSignin/RNGoogleSignin.h>

#define FACEBOOK_SCHEME  @"fb1788602697830227"
#define TWITTER_SCHEME  @"twitterkit-etLkC3zfjoc3i3m6m7kvOFEkk"
#define MY_GOOGLE_SIGNIN_SCHEME  @"com.googleusercontent.apps.1081430382071-th01l8r5v2hl5rt99g8ghointc4hj5vb"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"airline"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  return YES;
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options {
  if ([[url scheme] isEqualToString:FACEBOOK_SCHEME])
    return [[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options];
  if ([[url scheme] isEqualToString:TWITTER_SCHEME])
    return [[Twitter sharedInstance] application:app openURL:url options:options];
  if ([[url scheme] isEqualToString:MY_GOOGLE_SIGNIN_SCHEME])
    return [RNGoogleSignin application:app openURL:url sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey] annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
  return NO;
}

//- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
//  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
//  if ([[url scheme] isEqualToString:MY_GOOGLE_SIGNIN_SCHEME])
//    return [RNGoogleSignin application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
//  return NO;
//}

@end
