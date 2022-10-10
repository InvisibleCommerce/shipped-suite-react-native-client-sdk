import * as React from 'react';

import {
  NativeSyntheticEvent,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableHighlight,
  View
} from 'react-native';
import {
  ShippedSuite,
  ShippedSuiteType,
  WidgetChangeEventData,
  WidgetView
} from 'react-native-shipped-suite-sdk';

ShippedSuite.configure({
  publicKey:
    'pk_development_117c2ee46c122fb0ce070fbc984e6a4742040f05a1c73f8a900254a1933a0112',
  mode: 'development',
});

export default function App() {
  const [amount, setAmount] = React.useState('129.99');

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
    ShippedSuite.displayLearnMoreModal(ShippedSuiteType.GreenAndShield);
  };

  const getOffersFee = () => {
    ShippedSuite.getOffersFee(amount)
      .then((results: any) => console.log('Get offers fee:', results))
      .catch((error: any) => console.log('Failed to get offers fee:', error));
  };

  const widgetRef = React.useRef<any>(null);

  React.useEffect(() => {
    widgetRef.current?.updateOrderValue(amount);
  }, [amount]);

  return (
    <SafeAreaView>
      <View>
        {/* Input Order Value */}
        <View style={styles.orderValue}>
          <Text style={styles.title}>Order Value:</Text>
          <TextInput
            style={styles.input}
            defaultValue={amount}
            onSubmitEditing={onSubmitEditing}
          />
        </View>

        {/* Widget View */}
        <WidgetView
          ref={widgetRef}
          style={styles.widget}
          type={ShippedSuiteType.GreenAndShield}
          isRespectServer={true}
          onChange={onWidgetChange}
        />

        {/* Display Learn More Modal */}
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={displayLearnMoreModal}
        >
          <Text style={styles.button}>Display Learn More Modal</Text>
        </TouchableHighlight>

        {/* Get Offers Fee */}
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={getOffersFee}
        >
          <Text style={styles.button}>Send Offers Fee Request</Text>
        </TouchableHighlight>
      </View>
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
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 33.6,
  },
  input: {
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
    minHeight: Platform.OS === 'ios' ? 32 : 35,
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
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 33.6,
  },
});
