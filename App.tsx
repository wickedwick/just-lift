import BlankMenuScreen from './screens/BlankMenuScreen'
import CreateWorkoutScreen from './screens/CreateWorkoutScreen'
import Datastore, { MongoDocument } from 'react-native-local-mongodb'
import GuidedSelectionScreen from './screens/GuidedSelectionScreen'
import ProfileScreen from './screens/ProfileScreen'
import React, { useEffect, useState } from 'react'
import SelectWorkoutScreen from './screens/SelectWorkoutScreen'
import SettingsScreen from './screens/SettingsScreen'
import WorkoutListScreen from './screens/WorkoutListScreen'
import WorkoutScreen from './screens/WorkoutScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStore } from './services/data'
import { darkTheme } from './constants/Theme'
import { DataStoreType } from './types/common'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import { WorkoutPlan } from './types/workout'
import { WorkoutPlanContext } from './context/WorkoutPlanContext'

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)
  const workoutPlanStore: Datastore = createStore(DataStoreType.WorkoutPlan)

  useEffect(() => {
    workoutPlanStore
      .find({})
      .limit(1)
      .exec((err: Error | null, docs: MongoDocument[]) => {
        if (err) {
          console.log(err)
          return
        }

        if (docs.length > 0) {
          setWorkoutPlan(docs[0] as WorkoutPlan)
        }
      })
  }, [])

  return (
    <WorkoutPlanContext.Provider value={{ workoutPlan, setWorkoutPlan }}>
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
              options={{ title: 'Just Lift' }}
            />
            <Stack.Screen
              name='CreateWorkoutScreen'
              component={CreateWorkoutScreen}
              options={{ title: 'Setup Your Workout' }}
            />
            <Stack.Screen
              name='SelectWorkoutScreen'
              component={SelectWorkoutScreen}
              options={{ title: 'Select a Workout' }}
            />
            <Stack.Screen
              name='WorkoutScreen'
              component={WorkoutScreen}
              options={{ title: 'Workout' }}
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
    </WorkoutPlanContext.Provider>
  )
}

export default App
