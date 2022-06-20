import ActionButton from '../components/ActionButton';
import ExerciseCard from '../components/ExerciseCard';
import ExerciseForm from '../components/ExerciseForm';
import React, { useContext, useEffect, useState } from 'react';
import { createWorkoutPlan } from '../services/workoutFactory';
import { DatabaseContext } from '../context/DatabaseContext';
import { Exercise, Workout, WorkoutPlan } from '../types/workout';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
  } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TabOneParamList } from '../types/common';
import { updateExercises } from '../services/exerciseFactory';
import { useTheme } from 'react-native-paper';
import { WorkoutPlanContext } from '../context/WorkoutPlanContext';

export default function CreateWorkoutScreen({
  navigation
}: StackScreenProps<TabOneParamList, 'CreateWorkoutScreen'>): JSX.Element {
  const emptyWorkout: Workout = {
    id: 'A',
    exercises: [],
  }

  const [workoutIndex, setWorkoutIndex] = useState(0)
  const [workouts, setWorkouts] = useState([emptyWorkout])
  const [showExerciseForm, setShowExerciseForm] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const { colors } = useTheme()
  const styles = createStyles(colors)
  
  const { workoutPlanStore } = useContext(DatabaseContext)
  const { workoutPlan, setWorkoutPlan } = useContext(WorkoutPlanContext)

  useEffect(() => {
    if (!workoutPlan) {
      const newWorkoutPlan = createWorkoutPlan(1, workouts)
      setWorkoutPlan(newWorkoutPlan)
      setWorkouts(newWorkoutPlan.workouts)
      setWorkoutIndex(newWorkoutPlan.workoutIndex)
      return
    }

    setWorkouts(workoutPlan?.workouts)
    setWorkoutIndex(workoutPlan?.workoutIndex)
  }, [])

  const onSubmit = (exercise: Exercise) => {
    if (selectedExercise) {
      editExercise(exercise)
      return
    }

    const newWorkouts = [...workouts]
    newWorkouts[workoutIndex].exercises.push(exercise)
    setWorkouts(newWorkouts)
    setShowExerciseForm(false)
  }

  const editExercise = (exercise: Exercise) => {
    if (!selectedExercise) {
      return
    }

    if (!workouts.length) {
      const newWorkout: Workout = {
        id: '',
        exercises: []
      }
      setWorkouts([newWorkout])
    }

    const newWorkouts = [...workouts]
    newWorkouts[workoutIndex].exercises = updateExercises(workouts[workoutIndex].exercises, exercise)
    
    setWorkouts(newWorkouts)
    setSelectedExercise(null)
    setShowExerciseForm(false)
    return
  }

  const onRemoveExercise = (index: number) => {
    const newWorkouts = [...workouts]
    newWorkouts[workoutIndex].exercises.splice(index, 1)
    setWorkouts(newWorkouts)
  }

  const onEditExercise = (index: number) => {
    setSelectedExercise(workouts[workoutIndex].exercises[index])
    setShowExerciseForm(true)
  }

  const onRemoveWorkout = () => {
    setWorkouts(workouts.slice(0, workoutIndex).concat(workouts.slice(workoutIndex + 1)))
    setWorkoutIndex(workoutIndex - 1)
  }

  const onAddWorkout = () => {
    const newId = String.fromCharCode(workouts[workoutIndex].id.charCodeAt(workouts[workoutIndex].id.length - 1) + 1)
    const newWorkout = {...emptyWorkout, id: newId}
    
    setWorkouts([...workouts, newWorkout])
    setWorkoutIndex(workouts.length)
  }
  
  const onSavePress = async () => {
    const newWorkoutPlan: WorkoutPlan = createWorkoutPlan(3, workouts)

    if (workoutPlan) {
      await workoutPlanStore.removeAsync({})
    }

    await workoutPlanStore.insertAsync(newWorkoutPlan)
    setWorkoutPlan(newWorkoutPlan)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showExerciseForm && (
        <ExerciseForm exercise={selectedExercise || undefined} onSubmit={onSubmit} onCancel={() => { setShowExerciseForm(false) }} />
      )}

      {!showExerciseForm && (
        <View style={styles.flexContainer}>
          {workoutIndex > 0 && (
            <ActionButton
              contained
              onPress={() => { setWorkoutIndex(workoutIndex - 1) }}
              text="Previous"
            />
          )}

          {workouts && <Text style={styles.heading}>Workout {workouts[workoutIndex]?.id}</Text>}
          
          {workoutIndex < workouts.length - 1 && (
            <ActionButton
              contained
              onPress={() => { setWorkoutIndex(workoutIndex + 1) }}
              text="Next"
            />
          )}
        </View>
      )}

      {!showExerciseForm && workouts[workoutIndex]?.exercises.map((exercise, index) => (
        <ExerciseCard key={index} exercise={exercise} onEditPress={() => onEditExercise(index)} onRemovePress={() => onRemoveExercise(index)} />
      ))}

      {!showExerciseForm && (
        <ActionButton
          onPress={() => setShowExerciseForm(true)}
          text="Add Exercise"
        />
      )}

      {!showExerciseForm && workoutIndex === workouts.length -1 && (
        <ActionButton
          onPress={onAddWorkout}
          text="Add Workout"
        />
      )}

      {!showExerciseForm && workoutIndex > 0 && (
        <ActionButton
          onPress={onRemoveWorkout}
          text="Remove Workout"
        />
      )}

      {!showExerciseForm && (
        <View style={{ padding: 20 }}>
          <ActionButton
            contained
            onPress={onSavePress}
            style={{ marginTop: 10 }}
            text="Save"
          />
          
          <ActionButton
            onPress={() => navigation.reset({ routes: [{ name: 'BlankMenuScreen' }] })}
            text="Home"
          />
        </View>
      )}
    </ScrollView>
  )
}

const createStyles = (colors: ReactNativePaper.ThemeColors) => StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 35,
  },
  input: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginBottom: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: colors.text,
  }
})
