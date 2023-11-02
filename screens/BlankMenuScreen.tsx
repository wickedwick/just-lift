import ActionButton from '../components/ActionButton';
import Datastore from 'react-native-local-mongodb';
import React, { useContext } from 'react';
import { createStore } from '../services/data';
import { DataStoreType, TabOneParamList } from '../types/common';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
  } from 'react-native';
import { setWorkoutPlanInProgress } from '../services/workout';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import { WorkoutPlan } from '../types/workout';
import { WorkoutPlanContext } from '../context/WorkoutPlanContext';

export default function BlankMenu({
  navigation
}: StackScreenProps<TabOneParamList, 'BlankMenuScreen'>): JSX.Element {
  const { workoutPlan, setWorkoutPlan } = useContext(WorkoutPlanContext)
  const workoutPlanStore: Datastore = createStore(DataStoreType.WorkoutPlan)

  const { colors } = useTheme()
  const styles = createStyles(colors)

  const onStartWorkout = async () => {
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
      <View style={styles.logoContainer}>
        <Text style={styles.title}>JUST LIFT</Text>
        <Image
          style={styles.logo}
          source={require("../assets/adaptive-icon.png")}
        />
      </View>
      
      {(!workoutPlan || workoutPlan?.workouts.length === 0) && (
        <View>
          <ActionButton
            contained
            icon="circle-edit-outline"
            labelStyle={styles.buttonLabel}
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
              icon="weight-lifter"
              labelStyle={styles.buttonLabel}
              onPress={onStartWorkout}
              style={styles.button}
              text="Start Workout"
            />
          )}

          {workoutPlan?.workoutInProgress && (
            <ActionButton
              contained
              icon="weight-lifter"
              labelStyle={styles.buttonLabel}
              onPress={() => navigation.navigate('WorkoutScreen')}
              style={styles.button}
              text="Continue Workout"
            />
          )}

          <ActionButton
            contained
            icon="circle-edit-outline"
            labelStyle={styles.buttonLabel}
            onPress={() => navigation.navigate('CreateWorkoutScreen')}
            style={styles.button}
            text="Edit Workout"
          />
        </View>
      )}

      <ActionButton
        icon="cog"
        labelStyle={styles.buttonLabel}
        onPress={() => navigation.navigate('SettingsScreen')}
        style={styles.button}
        text="Settings"
      />

      <ActionButton
        icon="account"
        labelStyle={styles.buttonLabel}
        onPress={() => navigation.navigate('ProfileScreen')}
        style={styles.button}
        text="Profile"
      />
    </ScrollView>
  )
}

const createStyles = (colors: ReactNativePaper.ThemeColors) => StyleSheet.create({
  button: {
    marginTop: 10,
  },
  buttonLabel: {
    fontSize: 20,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    margin: 0,
    resizeMode: "contain",
    width: 180,
  },
  logoContainer: {
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 50,
    marginBottom: 0,
  }
})
