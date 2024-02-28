import AuthProvider from '@mobile/components/auth/AuthProvider';
import Dictation from '@mobile/screens/Dictation';
import Home from '@mobile/screens/Home';
import DetailLesson from '@mobile/screens/dictation/DetailLesson';
import ShortStory from '@mobile/screens/dictation/ShortStory';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
export type RootStackParamList = {
  Home: undefined;
  Dictation: undefined;
  ShortStory: undefined;
  DetailLesson: undefined;
};

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="DetailLesson">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Dictation" component={Dictation} />
            <Stack.Screen name="ShortStory" component={ShortStory} />
            <Stack.Screen name="DetailLesson" component={DetailLesson} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
