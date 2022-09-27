import * as React from 'react';

import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {
  configure,
  displayLearnMoreModal,
  getName,
  getOffersFee,
  multiply
} from 'react-native-shipped-suite-sdk';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    const name = getName();
    console.log(name);

    multiply(3, 7).then(setResult);

    configure({
      publicKey:
        'pk_development_117c2ee46c122fb0ce070fbc984e6a4742040f05a1c73f8a900254a1933a0112',
      mode: 'development',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TouchableHighlight onPress={() => displayLearnMoreModal('shield')}>
        <Text>Display Learn More Modal</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() =>
          getOffersFee('129.99')
            .then((results) => console.log(results))
            .catch((error) => console.log(error))
        }
      >
        <Text>Send Offers Fee Request</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
