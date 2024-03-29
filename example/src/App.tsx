import * as React from 'react';

import {
  Appearance,
  ColorSchemeName,
  LogBox,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  ShippedSuite,
  ShippedSuiteAppearance,
  ShippedSuiteType,
  WidgetChangeEventData,
  WidgetView,
} from 'react-native-shipped-suite-sdk';

ShippedSuite.configure({
  publicKey:
    'pk_development_117c2ee46c122fb0ce070fbc984e6a4742040f05a1c73f8a900254a1933a0112',
  mode: 'development',
});

LogBox.ignoreLogs(['EventEmitter.removeListener']);

export default function App() {
  const [amount, setAmount] = React.useState('129.99');
  const [theme, setTheme] = React.useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  const onSubmitEditing = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    setAmount(event.nativeEvent.text);
  };

  const onWidgetChange = (
    event: NativeSyntheticEvent<WidgetChangeEventData>
  ) => {
    console.log(event.nativeEvent);
  };

  const displayLearnMoreModal = () => {
    ShippedSuite.displayLearnMoreModal({
      type: ShippedSuiteType.GreenAndShield,
      isInformational: true,
      appearance: ShippedSuiteAppearance.Auto,
    });
  };

  const getOffersFee = () => {
    ShippedSuite.getOffersFee(amount, 'MAD')
      .then((results: any) => console.log('Get offers fee:', results))
      .catch((error: any) => console.log('Failed to get offers fee:', error));
  };

  const widgetRef = React.useRef<any>(null);

  React.useEffect(() => {
    widgetRef.current?.updateOrderValue(amount);
  }, [amount]);

  const themeChangeListener = React.useCallback(() => {
    setTheme(Appearance.getColorScheme());
  }, []);

  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(themeChangeListener);
    return () => subscription.remove();
  }, [themeChangeListener]);

  const isDarkTheme = () => {
    return theme === 'dark';
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDarkTheme() ? 'black' : 'white' }}
    >
      {/* Input Order Value */}
      <View style={styles.orderValue}>
        <Text style={isDarkTheme() ? darkStyles.title : styles.title}>
          Order Value:
        </Text>
        <TextInput
          style={isDarkTheme() ? darkStyles.input : styles.input}
          defaultValue={amount}
          onSubmitEditing={onSubmitEditing}
        />
      </View>

      {/* Widget View */}
      <WidgetView
        ref={widgetRef}
        style={styles.widget}
        configuration={{
          type: ShippedSuiteType.Shield,
          isInformational: false,
          isMandatory: false,
          isRespectServer: true,
          currency: 'EUR',
          appearance: ShippedSuiteAppearance.Auto,
        }}
        onChange={onWidgetChange}
      />

      {/* Display Learn More Modal */}
      <TouchableHighlight
        style={
          isDarkTheme() ? darkStyles.buttonContainer : styles.buttonContainer
        }
        onPress={displayLearnMoreModal}
      >
        <Text style={styles.button}>Display Learn More Modal</Text>
      </TouchableHighlight>

      {/* Get Offers Fee */}
      <TouchableHighlight
        style={
          isDarkTheme() ? darkStyles.buttonContainer : styles.buttonContainer
        }
        onPress={getOffersFee}
      >
        <Text style={styles.button}>Send Offers Fee Request</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  orderValue: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  title: {
    color: 'black',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 33.6,
  },
  input: {
    color: 'black',
    flex: 1,
    marginLeft: 16,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    minHeight: 40,
  },
  widget: {
    marginHorizontal: 16,
    height: 39,
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 10,
    height: 50,
    marginHorizontal: 16,
    backgroundColor: '#FFC933',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: 'black',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 33.6,
  },
});

const darkStyles = StyleSheet.create({
  title: {
    color: 'white',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 33.6,
  },
  input: {
    color: 'white',
    flex: 1,
    marginLeft: 16,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    minHeight: 40,
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 10,
    height: 50,
    marginHorizontal: 16,
    backgroundColor: '#FFCF4D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
