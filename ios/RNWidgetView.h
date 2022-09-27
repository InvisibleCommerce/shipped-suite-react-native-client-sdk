//
//  RNWidgetView.h
//  ShippedSuiteSdk
//
//  Created by Victor Zhu on 2022/9/27.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import <React/RCTViewManager.h>
#import <ShippedSuite/ShippedSuite.h>

@interface RNWidgetView : SSWidgetView

@property (nonatomic, copy) RCTBubblingEventBlock onChange;

@end
