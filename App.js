// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import BioMetricScreen from './screens/BioMetricScreen';
import MPINScreen from './screens/MPINScreen';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
     
      <Stack.Navigator initialRouteName='BioMetric' screenOptions={{headerShown:false}}>
      <Stack.Screen name="BioMetric" component={BioMetricScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MPIN" component={MPINScreen} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;