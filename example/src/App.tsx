import * as React from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
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

  const handleInput = (text: string) => {
    console.log('On change:', text);
    setAmount(text);
  };

  React.useEffect(() => {
    configure({
      publicKey:
        'pk_development_117c2ee46c122fb0ce070fbc984e6a4742040f05a1c73f8a900254a1933a0112',
      mode: 'development',
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Order Value:</Text>
        <TextInput style={styles.input} defaultValue={amount} onChangeText={handleInput} />
      </View>
      <WidgetView style={styles.widget} type={1} onChange={(values) => {
        console.log(values)
      }}/>
      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() => displayLearnMoreModal('shield')}
      >
        <Text style={styles.button}>Display Learn More Modal</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() =>
          getOffersFee(amount)
            .then((results) => console.log(results))
            .catch((error) => console.log(error))
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
    minHeight: 31
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
