#import "ShippedSuiteSdk.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNShippedSuiteSdkSpec.h"
#endif

#import <ShippedSuite/ShippedSuite.h>
#import <React/RCTConvert.h>
#import <React/RCTUtils.h>

static NSString* const kRNShippedSuiteConfigPublicKey = @"publicKey";
static NSString* const kRNShippedSuiteConfigMode = @"mode";

ShippedSuiteType FormatShippedSuiteTypeString(NSString *type)
{
    if ([type isEqualToString:@"green"]) {
        return ShippedSuiteTypeGreen;
    } else if ([type isEqualToString:@"green_and_shield"]) {
        return ShippedSuiteTypeGreenAndShield;
    }
    return ShippedSuiteTypeShield;
}

@implementation ShippedSuiteSdk
RCT_EXPORT_MODULE()

// Example method
// See // https://reactnative.dev/docs/native-modules-ios
RCT_REMAP_METHOD(multiply,
                 multiplyWithA:(double)a withB:(double)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
  NSNumber *result = @(a * b);

  resolve(result);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getName)
{
    return [[UIDevice currentDevice] name];
}

RCT_EXPORT_METHOD(configure:(NSDictionary*)configuration)
{
    NSString *publicKey = [RCTConvert NSString:configuration[kRNShippedSuiteConfigPublicKey]];
    NSString *mode = [RCTConvert NSString:configuration[kRNShippedSuiteConfigMode]];
    [ShippedSuite configurePublicKey:publicKey];
    if ([mode isEqualToString:@"production"]) {
        [ShippedSuite setMode:ShippedSuiteModeProduction];
    }
}

RCT_EXPORT_METHOD(displayLearnMoreModal:(NSString *)type)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        SSLearnMoreViewController *controller = [[SSLearnMoreViewController alloc] initWithType:FormatShippedSuiteTypeString(type)];
        UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:controller];
        if (UIDevice.currentDevice.userInterfaceIdiom == UIUserInterfaceIdiomPad) {
            nav.modalPresentationStyle = UIModalPresentationFormSheet;
            nav.preferredContentSize = CGSizeMake(650, 600);
        }
    
        UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
        [rootViewController presentViewController:nav animated:YES completion:nil];
    });
}

RCT_REMAP_METHOD(getOffersFee,
                 amount:(NSString *)amount
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    [ShippedSuite getOffersFee:[[NSDecimalNumber alloc] initWithString:amount] completion:^(SSOffers * _Nullable offers, NSError * _Nullable error) {
        if (error) {
            NSLog(@"Failed to get offers fee: %@", error.localizedDescription);
            resolve(error.localizedDescription);
            return;
        }
        
        NSLog(@"Get shield fee: %@", offers.shieldFee.stringValue);
        NSLog(@"Get green fee: %@", offers.greenFee.stringValue);
        resolve(@{@"storefrontId": offers.storefrontId ?: @"", @"orderValue": offers.orderValue ?: @"", @"shieldFee": offers.shieldFee ?: @"", @"greenFee": offers.greenFee ?: @"", @"offeredAt": offers.offeredAt.description ?: @""});
    }];
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeShippedSuiteSdkSpecJSI>(params);
}
#endif

@end
