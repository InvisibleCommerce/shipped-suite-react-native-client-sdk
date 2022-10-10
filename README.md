# ShippedSuite React Native SDK

Shipped Shield offers premium package assurance for shipments that are lost, damaged or stolen. Instantly track and resolve shipment issues hassle-free with the app.

## Example

To run the example project, clone the repo, run `yarn` in the root directory to install the required dependencies for each package:

```sh
yarn
```

To run the example app on iOS:

```sh
yarn example ios
```

To run the example app on Android:

```sh
yarn example android
```

## Requirements

### iOS

Xcode 13.3.1 or later and is compatible with apps targeting iOS 11.0 or above.

### Android

Android 5.0 (API level 21) and above

## Installation

```sh
yarn add react-native-shipped-suite-sdk
or
npm install react-native-shipped-suite-sdk
```

## Usage

```js
import {
  ShippedSuite
} from 'react-native-shipped-suite-sdk'

ShippedSuite.configure({
  publicKey: 'Your public key',
  mode: 'development',
});
```

### Create a Widget view with offers

You can initialize it and put it where you want.

```js
import {
  ShippedSuite,
  ShippedSuiteType,
  WidgetChangeEventData,
  WidgetView
} from 'react-native-shipped-suite-sdk';

<WidgetView
  ref={widgetRef}
  style={styles.widget}
  type={ShippedSuiteType.GreenAndShield}
  isRespectServer={true}
  onChange={onWidgetChange}
/>
```

Whenever the cart value changes, update the widget view with the latest cart value. This value should be the sum of the value of the order items, prior to discounts, shipping, taxes, etc. 

```js
widgetRef.current?.updateOrderValue(amount);
```

To get the callback from widget, you need implement the `onChange`.

```js
const onWidgetChange = (
    event: NativeSyntheticEvent<WidgetChangeEventData>
  ) => {
    console.log(event.nativeEvent);
  };
```

Print log:
```
{"isSelected": false, "shieldFee": "2.27"}
```

Within the callback, implement any logic necessary to add or remove Shield or Green from the cart, based on whether `isSelected` is true or false. 

### Customization

If you plan to implement the widget yourself to fit the app style, you can still use the functionality provided by the SDK.

- Request the Offers Fee

```js
ShippedSuite.getOffersFee(amount)
      .then((results: any) => console.log('Get offers fee:', results))
      .catch((error: any) => console.log('Failed to get offers fee:', error));
```

- Display learn more modal

```js
ShippedSuite.displayLearnMoreModal(ShippedSuiteType.GreenAndShield);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

ShippedSuite is available under the MIT license. See the [LICENSE](LICENSE) file for more info.
