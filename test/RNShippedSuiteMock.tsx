import { NativeModules } from 'react-native';

NativeModules.ShippedSuiteSdk = {
  configure: jest.fn(),
  displayLearnMoreModal: jest.fn(),
  getOffersFee: jest.fn(),
};
