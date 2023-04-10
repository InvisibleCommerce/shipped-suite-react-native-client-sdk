//
//  RNWidgetView.h
//  ShippedSuiteSdk
//
//  Created by Victor Zhu on 2022/9/27.
//  Copyright © 2022 Invisible Commerce. All rights reserved.
//

#import <React/RCTViewManager.h>

@interface RNWidgetView : UIView

@property (nonatomic) NSDictionary *configuration;

@property (nonatomic, copy) RCTBubblingEventBlock onChange;

- (void)updateOrderValue:(NSString *)amount;

@end
