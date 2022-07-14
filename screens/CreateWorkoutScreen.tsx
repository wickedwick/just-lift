import ActionButton from '../components/ActionButton'
import Datastore from 'react-native-local-mongodb'
import ExerciseCard from '../components/ExerciseCard'
import ExerciseForm from '../components/ExerciseForm'
import PagingControls from '../components/PagingControls'
import React, { useContext, useEffect, useState } from 'react'
import { createStore } from '../services/data'
import { createWorkoutPlan, emptyWorkout } from '../services/workoutFactory'
import { DataStoreType, TabOneParamList } from '../types/common'
import { Exercise, Workout, WorkoutPlan } from '../types/workout'
import { ScrollView, StyleSheet, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { updateExercises } from '../services/exerciseFactory'
import { WorkoutPlanContext } from '../context/WorkoutPlanContext'

export default function CreateWorkoutScreen({
  navigation
}: StackScreenProps<TabOneParamList, 'CreateWorkoutScreen'>): JSX.Element {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [showExerciseForm, setShowExerciseForm] = useState(false)
  const [workoutIndex, setWorkoutIndex] = useState(0)
  const [workouts, setWorkouts] = useState([emptyWorkout])
  const { workoutPlan, setWorkoutPlan } = useContext(WorkoutPlanContext)
  const workoutPlanStore: Datastore = createStore(DataStoreType.WorkoutPlan)
  const styles = createStyles()

  useEffect(() => {
    if (!workoutPlan) {
      const newWorkoutPlan = createWorkoutPlan(workouts.length, workouts)
      setWorkoutPlan(newWorkoutPlan)
    }
    
    setLocalState(workoutPlan?.workouts, workoutPlan?.workoutIndex)
  }, [])

  const setLocalState = (workouts: Workout[] | undefined, workoutIndex: number | undefined): void => {
    if (workouts) {
      setWorkouts(workouts)
    }
    
    if (workoutIndex) {
      setWorkoutIndex(workoutIndex)
    }
  }

  const onExerciseFormSubmit = (exercise: Exercise) => {
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
      setWorkouts([emptyWorkout])
    }

    const newWorkouts = [...workouts]
    newWorkouts[workoutIndex].exercises = updateExercises(workouts[workoutIndex].exercises, exercise)
    
    setWorkouts(newWorkouts)
    setSelectedExercise(null)
    setShowExerciseForm(false)
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
    const newWorkouts = workouts.slice(0, workoutIndex).concat(workouts.slice(workoutIndex + 1))
    setLocalState(newWorkouts, workoutIndex - 1)
  }

  const onAddWorkout = () => {
    const newId = String.fromCharCode(workouts[workoutIndex].id.charCodeAt(workouts[workoutIndex].id.length - 1) + 1)
    const newWorkout = {...emptyWorkout, id: newId}
    
    setLocalState([...workouts, newWorkout], workouts.length)
  }
  
  const onSavePress = async () => {
    const newWorkoutPlan: WorkoutPlan = createWorkoutPlan(workouts.length, workouts)

    if (workoutPlan) {
      await workoutPlanStore.removeAsync({})
    }

    await workoutPlanStore.insertAsync(newWorkoutPlan)
    setWorkoutPlan(newWorkoutPlan)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showExerciseForm && (
        <ExerciseForm exercise={selectedExercise || undefined} onSubmit={onExerciseFormSubmit} onCancel={() => { setShowExerciseForm(false) }} />
      )}

      {!showExerciseForm && (
        <PagingControls workoutIndex={workoutIndex} workouts={workouts} setWorkoutIndex={setWorkoutIndex} />
      )}

      {!showExerciseForm && workouts[workoutIndex]?.exercises?.map((exercise, index) => (
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

const createStyles = () => StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 35,
  },
  input: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginBottom: 10,
  },
})
