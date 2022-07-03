import AsyncStorage from '@react-native-async-storage/async-storage'
import BlankMenuScreen from './screens/BlankMenuScreen'
import CreateWorkoutScreen from './screens/CreateWorkoutScreen'
import Datastore, { MongoDocument } from 'react-native-local-mongodb'
import GuidedSelectionScreen from './screens/GuidedSelectionScreen'
import ProfileScreen from './screens/ProfileScreen'
import React, { useEffect } from 'react'
import SelectWorkoutScreen from './screens/SelectWorkoutScreen'
import SettingsScreen from './screens/SettingsScreen'
import WorkoutListScreen from './screens/WorkoutListScreen'
import WorkoutScreen from './screens/WorkoutScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { darkTheme } from './constants/Theme'
import { DatabaseContext } from './context/DatabaseContext'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import { WorkoutPlan } from './types/workout'
import { WorkoutPlanContext } from './context/WorkoutPlanContext'

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => {
  const logStore: Datastore = new Datastore({ filename: 'workout-log.db', storage: AsyncStorage, autoload: true })
  const workoutPlanStore: Datastore = new Datastore({ filename: 'workout-plan.db', storage: AsyncStorage, autoload: true })
  const [workoutPlan, setWorkoutPlan] = React.useState<WorkoutPlan | null>(null)

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
    <DatabaseContext.Provider value={{ logsStore: logStore, workoutPlanStore }}>
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
    </DatabaseContext.Provider>
  )
}

export default App
