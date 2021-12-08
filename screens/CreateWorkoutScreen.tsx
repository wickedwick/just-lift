import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ExerciseCard from '../components/ExerciseCard'
import ExerciseForm from '../components/ExerciseForm'
import { TabOneParamList } from '../types/common'
import { Exercise, Workout, WorkoutPlan } from '../types/workout'

export default function CreateWorkoutScreen({
  navigation
}: StackScreenProps<TabOneParamList, 'CreateWorkoutScreen'>): JSX.Element {
  const emptyWorkout: Workout = {
    id: 'A',
    exercises: [],
  }

  const [workoutIndex, setWorkoutIndex] = React.useState(0)
  const [workouts, setWorkouts] = React.useState([emptyWorkout])
  const [showExerciseForm, setShowExerciseForm] = React.useState(false)
  const [selectedExercise, setSelectedExercise] = React.useState<Exercise | null>(null)
  const { colors } = useTheme()
  const styles = createStyles(colors)

  const onSubmit = (exercise: Workout['exercises'][0]) => {
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

    const newWorkouts = [...workouts]
      newWorkouts[workoutIndex].exercises = workouts[workoutIndex].exercises.map(ex => {
        if (ex.name === selectedExercise.name) {
          return exercise
        }

        return ex
      })

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
    const newWorkoutPlan: WorkoutPlan = {
      workouts: workouts,
      daysPerWeek: 3,
      workoutIndex: 0,
      workoutInProgress: false,
      logs: [],
    }

    const jsonValue = JSON.stringify(newWorkoutPlan)
    await AsyncStorage.setItem('workoutPlan', jsonValue)
    navigation.reset({ routes: [{ name: 'BlankMenuScreen' }] })
  }

  useEffect(() => {
    AsyncStorage.getItem('workoutPlan').then(value => {
      const workoutPlan = JSON.parse(value || 'null')
      setWorkouts(workoutPlan?.workouts || [emptyWorkout])
    })
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showExerciseForm && (
        <ExerciseForm exercise={selectedExercise || undefined} onSubmit={onSubmit} onCancel={() => { setShowExerciseForm(false) }} />
      )}

      {!showExerciseForm && (
        <View style={styles.flexContainer}>
          {workoutIndex > 0 && (
            <Button
              mode="contained"
              onPress={() => { setWorkoutIndex(workoutIndex - 1) }}
            >
              Previous
            </Button>
          )}
          {workouts && <Text style={styles.heading}>Workout {workouts[workoutIndex]?.id}</Text>}
          {workoutIndex < workouts.length - 1 && (
            <Button
              mode="contained"
              onPress={() => { setWorkoutIndex(workoutIndex + 1) }}
            >
              Next
            </Button>
          )}
        </View>
      )}

      {!showExerciseForm && workouts[workoutIndex]?.exercises.map((exercise, index) => (
        <ExerciseCard key={index} exercise={exercise} onEditPress={() => onEditExercise(index)} onRemovePress={() => onRemoveExercise(index)} />
      ))}

      {!showExerciseForm && (
        <Button
          onPress={() => { setShowExerciseForm(true) }}
        >
          Add Exercise
        </Button>
      )}

      {!showExerciseForm && workoutIndex === workouts.length - 1 && (
        <Button
          onPress={onAddWorkout}
        >
          Add Workout
        </Button>
      )}

      {!showExerciseForm && workoutIndex > 0 && (
        <Button
          onPress={onRemoveWorkout}
        >
          Remove Workout
        </Button>
      )}

      {!showExerciseForm && (
        <Button
          mode="contained"
          onPress={onSavePress}
          style={{ marginTop: 10 }}
        >
          Save
        </Button>
      )}
    </ScrollView>
  )
}

const createStyles = (colors: ReactNativePaper.ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
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
