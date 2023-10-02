import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AddressScreen = ({route}) => {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddressScreen;
