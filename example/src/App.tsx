import * as React from 'react';

import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableHighlight,
  View
} from 'react-native';
import {
  configure,
  displayLearnMoreModal,
  getOffersFee,
  WidgetView
} from 'react-native-shipped-suite-sdk';

export default function App() {
  const [amount, setAmount] = React.useState('129.99');

  const onSubmitEditing = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    console.log('On change:', event.nativeEvent.text);
    setAmount(event.nativeEvent.text);
  };

  const widgetRef = React.useRef<any>(null);

  React.useEffect(() => {
    configure({
      publicKey:
        'pk_development_117c2ee46c122fb0ce070fbc984e6a4742040f05a1c73f8a900254a1933a0112',
      mode: 'development',
    });
  }, []);

  React.useEffect(() => {
    widgetRef.current?.updateOrderValue(amount);
  }, [amount]);

  return (
    <View style={styles.container}>
      {/* Input Order Value */}
      <View style={styles.row}>
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
        type={1}
        onChange={(event) => {
          console.log('Widget on change:', event.nativeEvent);
        }}
      />

      {/* Display Learn More Modal */}
      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() => displayLearnMoreModal('shield')}
      >
        <Text style={styles.button}>Display Learn More Modal</Text>
      </TouchableHighlight>

      {/* Get Offers Fee */}
      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() =>
          getOffersFee(amount)
            .then((results) => console.log('Get offers fee:', results))
            .catch((error) => console.log('Failed to get offers fee:', error))
        }
      >
        <Text style={styles.button}>Send Offers Fee Request</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 104,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
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
    height: 34,
    borderRadius: 6,
    borderColor: '#EEEEEE',
    borderWidth: 1,
  },
  widget: {
    marginHorizontal: 16,
    marginTop: 16,
    minHeight: 31,
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginHorizontal: 16,
    backgroundColor: '#FFC933',
  },
  button: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 33.6,
  },
});
