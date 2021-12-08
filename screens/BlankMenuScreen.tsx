import React, { useEffect } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Button } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import { getItemAsync, setItemAsync } from '../services/persistence'
import { TabOneParamList } from '../types/common'
import { Workout, WorkoutPlan } from '../types/workout'

export default function BlankMenu({
  navigation
}: StackScreenProps<TabOneParamList, 'BlankMenuScreen'>): JSX.Element {
  const [workouts, setWorkouts] = React.useState<Workout[]>([])
  const [workoutPlan, setWorkoutPlan] = React.useState<WorkoutPlan | null>(null)
  
  useEffect(() => {
    getItemAsync<WorkoutPlan>('workoutPlan').then(value => {
      const workoutPlan: WorkoutPlan = value
      setWorkoutPlan(workoutPlan)
      setWorkouts(workoutPlan?.workouts || [])
    })
  }, [])

  const handleStartWorkout = () => {
    const newWorkoutPlan: WorkoutPlan = {
      workouts: workouts,
      daysPerWeek: workoutPlan?.daysPerWeek || 1,
      workoutIndex: workoutPlan?.workoutIndex || 0,
      workoutInProgress: true,
      logs: workoutPlan?.logs || [],
    }

    setItemAsync<WorkoutPlan>('workoutPlan', newWorkoutPlan)
    setWorkoutPlan(newWorkoutPlan)
    navigation.navigate('WorkoutScreen')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {workouts.length === 0 && (
        <View>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('CreateWorkoutScreen')}
            style={styles.button}
          >
            Create Workout
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('SelectWorkoutScreen')}
            style={styles.button}
          >
            Select a Workout Plan
          </Button>
        </View>
      )}

      {workouts.length > 0 && (
        <View>
          {!workoutPlan?.workoutInProgress && (
            <Button
              mode="contained"
              onPress={handleStartWorkout}
              style={styles.button}
            >
              Start Workout
            </Button>
          )}
          {workoutPlan?.workoutInProgress && (
            <Button
              mode="contained"
              onPress={() => navigation.navigate('WorkoutScreen')}
              style={styles.button}
            >
              Continue Workout
            </Button>
          )}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('CreateWorkoutScreen')}
            style={styles.button}
          >
            Edit Workout
          </Button>
        </View>
      )}

      <Button
        onPress={() => navigation.navigate('SettingsScreen')}
        style={styles.button}
      >
        Settings
      </Button>
      <Button
        onPress={() => navigation.navigate('ProfileScreen')}
        style={styles.button}
      >
        Profile
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
  },
})
