import React, { useEffect } from 'react';
import SplashScreen from "react-native-splash-screen";

import HomeScreen from './src/screens/Home';
import Screen2 from './src/screens/Screen2';
import Screen3 from './src/screens/Screen3';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IdProvider } from './src/navigation/IdProvider'


const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <IdProvider>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Screen2" component={Screen2} options={{ headerShown: false }} />
      <Stack.Screen name="Screen3" component={Screen3} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  </IdProvider>
  )
};
export default App;


