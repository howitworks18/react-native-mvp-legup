// Updated LoginScreen.js
import React from 'react';
import {View, Button, StyleSheet, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useStores} from '../stores';

function LoggedinScreen({navigation}) {
  const {user} = useStores();
  const onLogoutPress = async () => {
    await auth().signOut();
    user.logout();
  };

  return (
    <View style={styles.container}>
      <Button title="Log Out" onPress={onLogoutPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoggedinScreen;
