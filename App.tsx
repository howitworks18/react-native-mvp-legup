import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StripeProvider} from '@stripe/stripe-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {STRIPE_PRIVATE_KEY} from '@env';

import MapScreen from './screens/MapScreen';
import PhotoScreen from './screens/PhotoScreen';
import ProgressScreen from './screens/ProgressScreen';
import PaymentScreen from './screens/PaymentScreen';
import ItemDetail from './screens/ItemDetail';
import LoginScreen from './screens/LoginScreen';
import LoggedinScreen from './screens/LoggedinScreen';
import SignUpScreen from './screens/SignUpScreen';
import CalendarScreen from './screens/CalendarScreen';
import {useStores} from './stores';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Define custom icons for each tab screen
const tabBarIcons = {
  MapStack: 'map-outline',
  CalendarStack: 'calendar-outline',
  ProgressStack: 'list-outline',
  PaymentStack: 'card-outline',
  PhotoStack: 'camera-outline',
  AuthStack: 'rocket-outline',
};

function getTabBarIcon(routeName, focused, color, size) {
  const iconName = tabBarIcons[routeName];
  return <Icon name={iconName} size={size} color={color} />;
}

function MapStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  const {user} = useStores();
  return (
    <Stack.Navigator>
      {user.isLoggedIn ? (
        <Stack.Screen name="LoggedinScreen" component={LoggedinScreen} />
      ) : (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
function CalendarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
    </Stack.Navigator>
  );
}

function PhotoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PhotoScreen" component={PhotoScreen} />
    </Stack.Navigator>
  );
}

function PaymentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
}

function ProgressStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProgressScreen" component={ProgressScreen} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <StripeProvider publishableKey={STRIPE_PRIVATE_KEY}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) =>
              getTabBarIcon(route.name, focused, color, size),
          })}>
          <Tab.Screen
            options={{headerShown: false}}
            name="MapStack"
            component={MapStack}
          />
          <Tab.Screen
            options={{headerShown: false}}
            name="CalendarStack"
            component={CalendarStack}
          />
          <Tab.Screen
            options={{headerShown: false}}
            name="ProgressStack"
            component={ProgressStack}
          />
          <Tab.Screen
            options={{headerShown: false}}
            name="PaymentStack"
            component={PaymentStack}
          />
          <Tab.Screen
            options={{headerShown: false}}
            name="PhotoStack"
            component={PhotoStack}
          />
          <Tab.Screen
            options={{headerShown: false}}
            name="AuthStack"
            component={AuthStack}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}

export default App;
