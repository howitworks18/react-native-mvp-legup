import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PaymentModal from '../components/PaymentModal';

const PaymentScreen = ({route}) => {
  return (
    <View style={styles.container}>
      <PaymentModal />
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

export default PaymentScreen;
