import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dictation from '@mobile/screens/Dictation';
import Home from '@mobile/screens/Home';
import ShortStory from '@mobile/screens/dictation/ShortStory';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from '@mobile/components/auth/AuthProvider';
export type RootStackParamList = {
  Home: undefined;
  Dictation: undefined;
  ShortStory: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator>
                  <Tab.Screen name="Home" component={Home} />
                  <Tab.Screen name="Dictation" component={Dictation} />
                </Tab.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen name="ShortStory" component={ShortStory} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
