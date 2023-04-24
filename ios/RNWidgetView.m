//
//  RNWidgetView.m
//  ShippedSuiteSdk
//
//  Created by Victor Zhu on 2022/9/27.
//  Copyright © 2022 Invisible Commerce. All rights reserved.
//

#import "RNWidgetView.h"
#import <ShippedSuite/ShippedSuite.h>

@interface RNWidgetView () <SSWidgetViewDelegate>

@property (nonatomic, strong) SSWidgetView *widgetView;

@end

@implementation RNWidgetView

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        _widgetView = [[SSWidgetView alloc] initWithFrame:frame];
        _widgetView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        _widgetView.delegate = self;
        [self addSubview:_widgetView];
    }
    return self;
}

- (void)setConfiguration:(NSDictionary *)configuration
{
    ShippedSuiteConfiguration *_configuration = [ShippedSuiteConfiguration new];
    NSNumber *type = configuration[@"type"];
    if (type) {
        _configuration.type = type.unsignedIntegerValue;
    }
    NSNumber *isInformational = configuration[@"isInformational"];
    if (isInformational) {
        _configuration.isInformational = isInformational.boolValue;
    }
    NSNumber *isMandatory = configuration[@"isMandatory"];
    if (isMandatory) {
        _configuration.isMandatory = isMandatory.boolValue;
    }
    NSNumber *isRespectServer = configuration[@"isRespectServer"];
    if (isRespectServer) {
        _configuration.isRespectServer = isRespectServer.boolValue;
    }
    _configuration.currency = configuration[@"currency"];
    self.widgetView.configuration = _configuration;
}

- (void)updateOrderValue:(NSString *)amount
{
    [self.widgetView updateOrderValue:[NSDecimalNumber decimalNumberWithString:amount]];
}

#pragma mark - SSWidgetViewDelegate

- (void)widgetView:(SSWidgetView *)widgetView onChange:(NSDictionary *)values
{
    self.onChange(values);
}

@end
