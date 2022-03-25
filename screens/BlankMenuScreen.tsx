import React, { useEffect } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { getItemAsync, setItemAsync } from '../services/persistence'
import { TabOneParamList } from '../types/common'
import { Workout, WorkoutPlan } from '../types/workout'
import ActionButton from '../components/ActionButton'

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
          <ActionButton
            contained
            onPress={() => navigation.navigate('CreateWorkoutScreen')}
            style={styles.button}
            text="Create Workout"
          />
          <ActionButton
            contained
            onPress={() => navigation.navigate('SelectWorkoutScreen')}
            style={styles.button}
            text="Select a Workout Plan"
          />
        </View>
      )}

      {workouts.length > 0 && (
        <View>
          {!workoutPlan?.workoutInProgress && (
            <ActionButton
              contained
              onPress={handleStartWorkout}
              style={styles.button}
              text="Start Workout"
            />
          )}
          {workoutPlan?.workoutInProgress && (
            <ActionButton
              contained
              onPress={() => navigation.navigate('WorkoutScreen')}
              style={styles.button}
              text="Continue Workout"
            />
          )}
          <ActionButton
            contained
            onPress={() => navigation.navigate('CreateWorkoutScreen')}
            style={styles.button}
            text="Edit Workout"
          />
        </View>
      )}

      <ActionButton
        onPress={() => navigation.navigate('SettingsScreen')}
        style={styles.button}
        text="Settings"
      />
      <ActionButton
        onPress={() => navigation.navigate('ProfileScreen')}
        style={styles.button}
        text="Profile"
      />
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
