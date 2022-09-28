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

export interface WidgetViewProps {
  style?: StyleProp<ViewStyle>;
  ref?: any;
  type?: number;
  //   type?: 'shield' | 'green' | 'green_and_shield';
  onChange: (values: any) => void;
}

export type WidgetViewMethods = {
  updateOrderValue: (amount: string) => void;
};

const WidgetViewIOS = requireNativeComponent<WidgetViewProps>('RNWidgetView');

// export const WidgetView = forwardRef(
//   (props: WidgetViewProps, ref: Ref<typeof WidgetViewIOS>) => {
//     const { type, onChange, ...others } = props;
//     const widgetRef = useRef<any>(null);

//     return (
//       <WidgetViewIOS ref={widgetRef} type={type} onChange={onChange} {...others} />
//     );
//   }
// );

const _WidgetView: ForwardRefRenderFunction<
  WidgetViewMethods,
  WidgetViewProps
> = (props, ref) => {
  const { type, onChange, ...others } = props;
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
    <WidgetViewIOS
      ref={widgetRef}
      type={type}
      onChange={onChange}
      {...others}
    />
  );
};

export const WidgetView = forwardRef(_WidgetView);
