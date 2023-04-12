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

RCT_EXPORT_METHOD(configure:(NSDictionary *)configuration)
{
    NSString *publicKey = [RCTConvert NSString:configuration[kRNShippedSuiteConfigPublicKey]];
    NSString *mode = [RCTConvert NSString:configuration[kRNShippedSuiteConfigMode]];
    [ShippedSuite configurePublicKey:publicKey];
    if ([mode isEqualToString:@"production"]) {
        [ShippedSuite setMode:ShippedSuiteModeProduction];
    }
}

RCT_EXPORT_METHOD(displayLearnMoreModal:(NSDictionary *)configuration)
{
    NSNumber *type = configuration[@"type"];
    NSNumber *isInformational = configuration[@"isInformational"];
    NSNumber *isMandatory = configuration[@"isMandatory"];
    NSNumber *isRespectServer = configuration[@"isRespectServer"];
    NSString *currency = configuration[@"currency"];

    ShippedSuiteConfiguration *_configuration = [ShippedSuiteConfiguration new];
    _configuration.type = type ? ShippedSuiteType(type.unsignedIntegerValue) : ShippedSuiteTypeShield;
    _configuration.isInformational = isInformational ? [isInformational boolValue] : NO;
    _configuration.isMandatory = isMandatory ? [isMandatory boolValue] : NO;
    _configuration.isRespectServer = isRespectServer ? [isRespectServer boolValue] : NO;
    _configuration.currency = currency;

    dispatch_async(dispatch_get_main_queue(), ^{
        SSLearnMoreViewController *controller = [[SSLearnMoreViewController alloc] initWithConfiguration:_configuration];
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
                 currency:(nullable NSString *)currency
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    [ShippedSuite getOffersFee:[[NSDecimalNumber alloc] initWithString:amount] currency:currency completion:^(SSOffers * _Nullable offers, NSError * _Nullable error) {
        if (error) {
            NSLog(@"Failed to get offers fee: %@", error.localizedDescription);
            resolve(error.localizedDescription);
            return;
        }
        
        resolve(@{@"storefrontId": offers.storefrontId ?: [NSNull null], @"orderValue": offers.orderValue.stringValue ?: [NSNull null], @"shieldFee": offers.shieldFee.stringValue ?: [NSNull null], @"greenFee": offers.greenFee.stringValue ?: [NSNull null], @"offeredAt": offers.offeredAt.description ?: [NSNull null]});
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
