import React from 'react';
import {
    requireNativeComponent,
    StyleProp, ViewStyle
} from 'react-native';

export interface NativeProps {
  style?: StyleProp<ViewStyle>;
  type?: number;
//   type?: 'shield' | 'green' | 'green_and_shield';
  onChange: (values: any) => void;
}

const WidgetViewIOS = requireNativeComponent<NativeProps>('RNWidgetView');

export function WidgetView({
//   type = 'shield',
  type = 0,
  onChange,
  ...props
}: NativeProps) {
  return <WidgetViewIOS type={type} onChange={onChange} {...props} />;
}
