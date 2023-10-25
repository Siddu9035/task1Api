import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ApiTask from './screens/ApiTask';
import ProductDetailScreen from './screens/ProductDetailScreen';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import Postal from './screens/Postal';
import TestPayment from './screens/TestPayment';

const Stack = createStackNavigator();
const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showSplash && (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        )}
        <>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ApiTask"
            component={ApiTask}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="Postal"
            component={Postal}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TestPayment"
            component={TestPayment}
            options={{headerShown: false}}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
