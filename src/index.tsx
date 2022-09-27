import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-shipped-suite-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const ShippedSuiteSdk = NativeModules.ShippedSuiteSdk  ? NativeModules.ShippedSuiteSdk  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return ShippedSuiteSdk.multiply(a, b);
}

export function getName(): Promise<number> {
  return ShippedSuiteSdk.getName();
}

export function configure(serializable: {string: any}) {
  return ShippedSuiteSdk.configure(serializable);
}

export function displayLearnMoreModal(type: string) {
  return ShippedSuiteSdk.displayLearnMoreModal(type)
}