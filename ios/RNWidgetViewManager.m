//
//  RNWidgetViewManager.m
//  ShippedSuiteSdk
//
//  Created by Victor Zhu on 2022/9/27.
//  Copyright © 2022 Invisible Commerce. All rights reserved.
//

#import "RNWidgetViewManager.h"
#import <ShippedSuite/ShippedSuite.h>
#import <React/RCTConvert.h>
#import "RNWidgetView.h"

@interface RNWidgetViewManager ()

@property (nonatomic, strong) RNWidgetView *widgetView;

@end

@implementation RNWidgetViewManager

RCT_EXPORT_MODULE(RNWidgetView)

RCT_EXPORT_VIEW_PROPERTY(configuration, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(updateOrderValue: (nonnull NSNumber *)reactTag amount: (nonnull NSString *)amount) {
    [self.widgetView updateOrderValue:amount];
}

- (UIView *)view
{
    _widgetView = [RNWidgetView new];
    return _widgetView;
}

@end
