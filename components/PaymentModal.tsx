import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import {
  CardField,
  presentPaymentSheet,
  useStripe,
} from '@stripe/stripe-react-native';

const PaymentModal = () => {
  const { initPaymentSheet } = useStripe();
  const [paymentStatus, setPaymentStatus] = useState('');

  // Line item state for the checkout display
  const [item, setItem] = useState({
    name: 'Sample Product',
    price: 20, // Assuming the price is in dollars for display purposes
  });

  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:3000/payments/intents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: item.price * 100, // Convert dollars to cents for stripe processing
        }),
      });

      if (!response.ok) {
        console.error('Response:', response.status, response.statusText);
        const text = await response.text();
        console.error('Response Body:', text);
        throw new Error('Failed to fetch the payment intent from the server.');
      }

      const data = await response.json();
      const paymentIntent = data.paymentIntent;

      if (!paymentIntent) {
        throw new Error('No client secret received from server.');
      }

      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'LegUp Demo',
        paymentIntentClientSecret: paymentIntent,
      });

      if (initError) {
        console.log('Initialization failed:', initError.message);
        setPaymentStatus('Initialization failed');
        return;
      }

      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        console.log('Payment failed:', paymentError.message);
        setPaymentStatus('Payment failed');
        return;
      }

      setPaymentStatus('Payment successful');
      Alert.alert('Success', 'Your payment was successful!');

    } catch (e) {
      console.error('Error:', e.message);
      setPaymentStatus(`${e.message}, is your server running?`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.total}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <CardField postalCodeEnabled={false} />
      <Button title="Make Payment" onPress={handlePayment} />
      {paymentStatus && <Text>{paymentStatus}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    color: 'red',
  },
});

export default PaymentModal;
