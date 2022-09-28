//
//  RNWidgetViewManager.m
//  ShippedSuiteSdk
//
//  Created by Victor Zhu on 2022/9/27.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import "RNWidgetViewManager.h"
#import <ShippedSuite/ShippedSuite.h>
#import <React/RCTConvert.h>
#import "RNWidgetView.h"

@interface RNWidgetViewManager () <SSWidgetViewDelegate>

@property (nonatomic, strong) RNWidgetView *widgetView;

@end

@implementation RNWidgetViewManager

RCT_EXPORT_MODULE(RNWidgetView)

RCT_EXPORT_VIEW_PROPERTY(type, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(isRespectServer, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(updateOrderValue: (nonnull NSNumber *)reactTag amount: (nonnull NSString *)amount) {
    [self.widgetView updateOrderValue:[NSDecimalNumber decimalNumberWithString:amount]];
}

- (UIView *)view
{
    self.widgetView = [RNWidgetView new];
    self.widgetView.delegate = self;
    return self.widgetView;
}

#pragma mark - SSWidgetViewDelegate

- (void)widgetView:(SSWidgetView *)widgetView onChange:(NSDictionary *)values
{
    BOOL isSelected = [values[SSWidgetViewIsSelectedKey] boolValue];
    NSLog(@"Widget state: %@", isSelected ? @"YES" : @"NO");
    
    NSDecimalNumber *shieldFee = values[SSWidgetViewShieldFeeKey];
    if (shieldFee) {
        NSLog(@"Shield fee: %@", shieldFee.stringValue);
    }
    
    NSDecimalNumber *greenFee = values[SSWidgetViewGreenFeeKey];
    if (greenFee) {
        NSLog(@"Green fee: %@", greenFee.stringValue);
    }
    
    NSError *error = values[SSWidgetViewErrorKey];
    if (error) {
        NSLog(@"Widget error: %@", error.localizedDescription);
    }
    
    self.widgetView.onChange(values);
}

@end
