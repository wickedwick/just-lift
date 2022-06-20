import ActionButton from '../components/ActionButton';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { setWorkoutPlanInProgress } from '../services/workoutFactory';
import { StackScreenProps } from '@react-navigation/stack';
import { TabOneParamList } from '../types/common';
import { WorkoutPlan } from '../types/workout';
import { WorkoutPlanContext } from '../context/WorkoutPlanContext';
import { DatabaseContext } from '../context/DatabaseContext';

export default function BlankMenu({
  navigation
}: StackScreenProps<TabOneParamList, 'BlankMenuScreen'>): JSX.Element {
  const { workoutPlan, setWorkoutPlan } = useContext(WorkoutPlanContext)
  const { workoutPlanStore } = useContext(DatabaseContext)

  const handleStartWorkout = async () => {
    const newWorkoutPlan: WorkoutPlan = setWorkoutPlanInProgress(workoutPlan as WorkoutPlan)

    if (workoutPlan) {
      await workoutPlanStore.removeAsync({})
    }

    await workoutPlanStore.insertAsync(newWorkoutPlan)
    setWorkoutPlan(newWorkoutPlan)
    navigation.navigate('WorkoutScreen')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {(!workoutPlan || workoutPlan?.workouts.length === 0) && (
        <View>
          <ActionButton
            contained
            onPress={() => navigation.navigate('CreateWorkoutScreen')}
            style={styles.button}
            text="Create Workout"
          />

          {/* <ActionButton
            contained
            onPress={() => navigation.navigate('SelectWorkoutScreen')}
            style={styles.button}
            text="Select a Workout Plan"
          /> */}
        </View>
      )}

      {workoutPlan && workoutPlan?.workouts.length > 0 && (
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
