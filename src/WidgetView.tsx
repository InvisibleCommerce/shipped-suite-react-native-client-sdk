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

export type ShippedSuiteConfiguration = {
  type?: ShippedSuiteType;
  isInformational?: boolean;
  isMandatory?: boolean;
  isRespectServer?: boolean;
  currency?: string;
};

export interface WidgetViewProps {
  style?: StyleProp<ViewStyle>;
  ref?: any;
  configuration: ShippedSuiteConfiguration;
  onChange: (values: any) => void;
}

export type WidgetViewMethods = {
  updateOrderValue: (amount: string) => void;
};

export interface WidgetChangeEventData {
  isSelected: boolean;
  totalFee?: string;
  error?: string;
}

const RNWidgetView = requireNativeComponent<WidgetViewProps>('RNWidgetView');

const _WidgetView: ForwardRefRenderFunction<
  WidgetViewMethods,
  WidgetViewProps
> = (props, ref) => {
  const { configuration, onChange, ...others } = props;
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
    <RNWidgetView
      ref={widgetRef}
      configuration={configuration}
      onChange={onChange}
      {...others}
    />
  );
};

export const WidgetView = forwardRef(_WidgetView);
