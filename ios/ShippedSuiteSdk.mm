#import "ShippedSuiteSdk.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNShippedSuiteSdkSpec.h"
#endif

#import <ShippedSuite/ShippedSuite.h>
#import <React/RCTConvert.h>
#import <React/RCTUtils.h>

static NSString* const kRNShippedSuiteConfigPublicKeyKey = @"publicKey";

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
    NSString *publicKey = [RCTConvert NSString:configuration[kRNShippedSuiteConfigPublicKeyKey]];
    [ShippedSuite configurePublicKey:publicKey];
    NSLog(@"%@", publicKey);
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
