import { NativeModules } from 'react-native';
const { ShippedSuiteSdk } = NativeModules;

test('Configure is defined', () => {
  expect(ShippedSuiteSdk.configure).toBeDefined;
});

test('DisplayLearnMoreModal is defined', () => {
  expect(ShippedSuiteSdk.displayLearnMoreModal).toBeDefined;
});

test('GetOffersFee is defined', () => {
  expect(ShippedSuiteSdk.getOffersFee).toBeDefined;
});
