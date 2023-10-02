import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Steps from '../components/ProgressStep';

const ComponentStack = ({route}) => {
  return (
    <View style={styles.container}>
      <Steps />
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

export default ComponentStack;
