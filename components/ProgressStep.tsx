import React from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
const Steps = () => {
  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    },
  };

  const onNextStep = () => {
    console.log('called next step');
  };

  const onPaymentStepComplete = () => {
    Alert.alert('Payment step completed!');
  };

  const onPrevStep = () => {
    console.log('called previous step');
  };

  const onSubmitSteps = () => {
    console.log('called on submit step.');
  };

  return (
    <View style={styles.container}>
      <ProgressSteps
        activeStepIconBorderColor={'#1987ff'}
        completedProgressBarColor={'#1987ff'}
        activeLabelColor={'#1987ff'}
        completedStepIconColor={'#1987ff'}
        completedLabelColor={'#1987ff'}
        activeStepNumColor={'#1987ff'}>
        <ProgressStep
          label="Payment"
          onNext={onPaymentStepComplete}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}>
          <View style={styles.stepContent}>
            <Text>Payment step content</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Shipping Address"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}>
          <View style={styles.stepContent}>
            <Text>Shipping address step content</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Billing Address"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}>
          <View style={styles.stepContent}>
            <Text>Billing address step content</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Confirm Order"
          onPrevious={onPrevStep}
          onSubmit={onSubmitSteps}
          scrollViewProps={defaultScrollViewProps}>
          <View style={styles.stepContent}>
            <Text>Confirm order step content</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContent: {
    alignItems: 'center',
  },
});

export default Steps;
