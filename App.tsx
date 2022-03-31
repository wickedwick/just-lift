import BlankMenuScreen from './screens/BlankMenuScreen';
import CreateWorkoutScreen from './screens/CreateWorkoutScreen';
import GuidedSelectionScreen from './screens/GuidedSelectionScreen';
import ProfileScreen from './screens/ProfileScreen';
import React from 'react';
import SelectWorkoutScreen from './screens/SelectWorkoutScreen';
import SettingsScreen from './screens/SettingsScreen';
import WorkoutListScreen from './screens/WorkoutListScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { darkTheme } from './constants/Theme';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator()

export default function App(): JSX.Element {
  return (
    <PaperProvider theme={darkTheme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: darkTheme.colors.background },
            contentStyle: { backgroundColor: darkTheme.colors.background },
            headerTitleStyle: { color: darkTheme.colors.text, fontWeight: 'bold', fontSize: 20 },
        }}
        >
          <Stack.Screen
            name='BlankMenuScreen'
            component={BlankMenuScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen
            name='CreateWorkoutScreen'
            component={CreateWorkoutScreen}
            options={{ title: 'Create a Workout' }}
          />
          <Stack.Screen
            name='SelectWorkoutScreen'
            component={SelectWorkoutScreen}
            options={{ title: 'Select a Workout' }}
          />
          <Stack.Screen
            name='WorkoutScreen'
            component={WorkoutScreen}
            options={{ title: 'Start Workout' }}
          />
          <Stack.Screen
            name='SettingsScreen'
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
          <Stack.Screen
            name='ProfileScreen'
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />
          <Stack.Screen
            name='GuidedSelectionScreen'
            component={GuidedSelectionScreen}
            options={{ title: 'Guided Selection' }}
          />
          <Stack.Screen
            name='WorkoutListScreen'
            component={WorkoutListScreen}
            options={{ title: 'Workout List' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
