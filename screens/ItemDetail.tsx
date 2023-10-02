import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ItemDetail = ({route}) => {
  const {itemId} = route.params;

  useEffect(() => {
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
      });
  });
  return (
    <View style={styles.container}>
      <Text>Item Detail Screen</Text>
      <Text>Item ID: {itemId}</Text>
      {/* Add more details for the selected item */}
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

export default ItemDetail;
