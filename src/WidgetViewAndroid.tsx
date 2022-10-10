import React, {
    forwardRef,
    ForwardRefRenderFunction,
    useImperativeHandle,
    useRef
  } from 'react';
  import {
    findNodeHandle,
    requireNativeComponent,
    StyleProp,
    UIManager,
    ViewStyle
  } from 'react-native';
  
  export enum ShippedSuiteType {
    Shield,
    Green,
    GreenAndShield,
  }
  
  export interface WidgetViewProps {
    style?: StyleProp<ViewStyle>;
    ref?: any;
    isRespectServer?: boolean;
    type?: ShippedSuiteType;
    onChange: (values: any) => void;
  }
  
  export type WidgetViewMethods = {
    updateOrderValue: (amount: string) => void;
  };

  export interface WidgetChangeEventData {
    isSelected: boolean;
    shieldFee?: string;
    greenFee?: string;
    error?: string;
    }
  
  const WidgetViewAndroid = requireNativeComponent<WidgetViewProps>('RNWidgetView');
  
  const _WidgetView: ForwardRefRenderFunction<
    WidgetViewMethods,
    WidgetViewProps
  > = (props, ref) => {
    const { type, isRespectServer, onChange, ...others } = props;
    const widgetRef = useRef<any>(null);
  
    const updateOrderValue = (amount: string) => {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(widgetRef.current),
        'updateOrderValue' as any,
        [amount]
      );
    };
  
    useImperativeHandle(
      ref,
      () => ({
        updateOrderValue,
      }),
      []
    );
  
    return (
      <WidgetViewAndroid
        ref={widgetRef}
        type={type}
        isRespectServer={isRespectServer}
        onChange={onChange}
        {...others}
      />
    );
  };
  
  export const WidgetView = forwardRef(_WidgetView);
  