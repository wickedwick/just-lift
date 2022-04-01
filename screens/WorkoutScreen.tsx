import ActionButton from '../components/ActionButton';
import ExerciseCounter from '../components/ExerciseCounter';
import React, { useEffect } from 'react';
import { Button, useTheme } from 'react-native-paper';
import { finishWorkout, updateWorkoutPlan } from '../services/workoutFactory';
import { getItemAsync, setItemAsync } from '../services/persistence';
import { Log, Workout, WorkoutPlan } from '../types/workout';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TabOneParamList } from '../types/common';

const emptyWorkout: Workout = {
  id: '',
  exercises: [],
}

const WorkoutScreen = ({
  navigation
}: StackScreenProps<TabOneParamList, 'WorkoutScreen'>): JSX.Element => {
  const [workout, setWorkout] = React.useState<Workout>(emptyWorkout)
  const [workoutPlan, setWorkoutPlan] = React.useState<WorkoutPlan | null>(null)
  const [logs, setLogs] = React.useState<Log[]>([])
  const { colors } = useTheme()
  const styles = createStyles(colors)

  useEffect(() => {
    getItemAsync<WorkoutPlan>('workoutPlan').then(value => {
      const workoutPlan = value
      setWorkoutPlan(workoutPlan)
      setWorkout(workoutPlan?.workouts[workoutPlan?.workoutIndex] || emptyWorkout)
      const logs = workoutPlan?.logs || []
      setLogs(logs)
    })
  }, [])

  const setLogData = (log: Log) => {
    const newLog: Log = { ...log, date: new Date() }
    let newLogs: Log[] = [...logs]
    
    if (logs.find(l => l.exerciseName === log.exerciseName)) {
      newLogs = logs.map(log => {
        if (log.exerciseName === newLog.exerciseName) {
          return newLog
        }

        return log
      })
    } else {
      newLogs.push(newLog)
    }

    setLogs(newLogs)
  }
  
  const handleFinishExercise = async () => {
    const workouts: Workout[] | undefined = finishWorkout(workoutPlan?.workouts as Workout[], workout)    
    const newWorkoutPlan: WorkoutPlan = updateWorkoutPlan(workoutPlan, workouts, logs)

    setWorkoutPlan(newWorkoutPlan)
    await setItemAsync<WorkoutPlan>('workoutPlan', newWorkoutPlan)
    navigation.reset({ routes: [{ name: 'BlankMenuScreen' }] })
  }

  const handleNextExercise = () => {
    const workouts: Workout[] | undefined = finishWorkout(workoutPlan?.workouts as Workout[], workout)
    const newWorkoutPlan: WorkoutPlan = updateWorkoutPlan(workoutPlan, workouts, logs)

    setWorkoutPlan(newWorkoutPlan)
    setWorkout(newWorkoutPlan.workouts[newWorkoutPlan.workoutIndex])
    
    const newLogs = workoutPlan?.logs || []
    setLogs(newLogs)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workout {workout.id}</Text>
      
      {workout.exercises.map(exercise => (
        <ExerciseCounter key={exercise.name} exercise={exercise} setLogData={setLogData} />
      ))}

      <ActionButton
        style={styles.button}
        contained
        onPress={handleFinishExercise}
        text="Finish Workout"
      />
      
      <ActionButton
        onPress={handleNextExercise}
        text="Skip Workout"
      />
    </ScrollView>
  )
}

const createStyles = (colors: ReactNativePaper.ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  button: {
    marginTop: 10,
  },
})

export default WorkoutScreen
