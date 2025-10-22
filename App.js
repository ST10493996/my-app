import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from './context/MenuContext';
import HomeScreen from './screens/HomeScreen';
import AddDishScreen from './screens/AddDishScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: '#fff' },
              headerTintColor: '#111827',
              contentStyle: { backgroundColor: '#fff' }
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Christoffel's Menu" }} />
            <Stack.Screen name="AddDish" component={AddDishScreen} options={{ title: 'Add Dish' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
          
