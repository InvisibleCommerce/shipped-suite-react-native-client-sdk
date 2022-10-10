import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-shipped-suite-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

export const ShippedSuite = NativeModules.ShippedSuiteSdk
  ? NativeModules.ShippedSuiteSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function configure(serializable: { publicKey: string; mode: string }) {
  return ShippedSuite.configure(serializable);
}

export function displayLearnMoreModal(type: string) {
  return ShippedSuite.displayLearnMoreModal(type);
}

export function getOffersFee(amount: string): Promise<{ string: any }> {
  return ShippedSuite.getOffersFee(amount);
}

export { ShippedSuiteType, WidgetView, WidgetViewProps, WidgetViewMethods, WidgetChangeEventData } from './WidgetView';
