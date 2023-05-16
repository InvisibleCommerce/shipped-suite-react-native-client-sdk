import { NativeModules, Platform } from 'react-native';
import type { ShippedSuiteConfiguration } from './WidgetView';

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

export function displayLearnMoreModal(configuration: ShippedSuiteConfiguration) {
  return ShippedSuite.displayLearnMoreModal(configuration);
}

export function getOffersFee(amount: string, currency = "USD"): Promise<{ string: any }> {
  return ShippedSuite.getOffersFee(amount, currency);
}

export { ShippedSuiteType, ShippedSuiteAppearance, WidgetView, WidgetViewProps, WidgetViewMethods, WidgetChangeEventData } from './WidgetView';
