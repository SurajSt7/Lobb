import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Details, { DetailsParams } from '../screens/DetailsScreen';

export type ScreenTypes = {
  Home: undefined;
  Details: DetailsParams;
};

const Stack = createNativeStackNavigator<ScreenTypes>();

const SCREEN_OPTIONS = { headerShown: false };

const Navigator: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen component={Home} name="Home" options={SCREEN_OPTIONS} />
          <Stack.Screen
            component={Details}
            name="Details"
            options={SCREEN_OPTIONS}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigator;
