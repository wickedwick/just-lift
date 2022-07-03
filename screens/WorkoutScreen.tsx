import ActionButton from '../components/ActionButton';
import ExerciseCounter from '../components/ExerciseCounter';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, List, Paragraph, useTheme } from 'react-native-paper';
import { changeWeight } from '../services/exerciseFactory';
import { DatabaseContext } from '../context/DatabaseContext';
import {
  finishWorkout,
  incrementWorkoutIndex,
  updateWorkoutExercises,
  updateWorkoutPlan
  } from '../services/workoutFactory';
import { Log, Workout, WorkoutPlan } from '../types/workout';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
  } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TabOneParamList } from '../types/common';
import { WorkoutPlanContext } from '../context/WorkoutPlanContext';

const emptyWorkout: Workout = {
  id: '',
  exercises: [],
}

const WorkoutScreen = ({
  navigation
}: StackScreenProps<TabOneParamList, 'WorkoutScreen'>): JSX.Element => {
  const [logs, setLogs] = useState<Log[]>([])
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [workout, setWorkout] = useState<Workout>(emptyWorkout)
  
  const { colors } = useTheme()
  const styles = createStyles(colors)
  
  const { logsStore, workoutPlanStore } = useContext(DatabaseContext)
  const { workoutPlan, setWorkoutPlan } = useContext(WorkoutPlanContext)

  useEffect(() => {
    setWorkout(workoutPlan?.workouts[workoutPlan?.workoutIndex] || emptyWorkout)
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
  
  const handleFinishWorkout = async () => {
    const workouts: Workout[] | undefined = finishWorkout(workoutPlan?.workouts as Workout[], workout)    
    const newWorkoutPlan: WorkoutPlan = updateWorkoutPlan(workoutPlan, workouts)

    if (workoutPlan) {
      await workoutPlanStore.removeAsync({})
    }

    await logsStore.insertAsync(logs)
    await workoutPlanStore.insertAsync(newWorkoutPlan)
    
    setWorkoutPlan(newWorkoutPlan)
    navigation.reset({ routes: [{ name: 'BlankMenuScreen' }] })
  }

  const handleNextWorkout = () => {
    if (!workoutPlan) {
      return
    }
    
    const newWorkoutPlan: WorkoutPlan = {...workoutPlan, workoutIndex: incrementWorkoutIndex(workoutPlan)} as WorkoutPlan
    
    setWorkoutPlan(newWorkoutPlan)
    setWorkout(newWorkoutPlan.workouts[newWorkoutPlan.workoutIndex])
    
    setLogs([])
  }

  const handleChangeWeight = (weight: number, exerciseName: string) => {
    const newExersises = changeWeight(workout.exercises, exerciseName, weight)
    const newWorkout: Workout = updateWorkoutExercises(workout, newExersises)
    setWorkout(newWorkout)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Workout {workout.id}</Text>
        </View>
        <View>
          <ActionButton
            contained
            icon="crosshairs-question"
            style={styles.smallButton}
            onPress={() => setShowDialog(!showDialog)}
            text=""
          />
        </View>
      </View>

      {workout.exercises.map(exercise => (
        <ExerciseCounter key={exercise.name} exercise={exercise} setLogData={setLogData} setWeight={handleChangeWeight} />
      ))}

      <ActionButton
        style={styles.button}
        contained
        onPress={handleFinishWorkout}
        text="Finish Workout"
      />
      
      <ActionButton
        onPress={handleNextWorkout}
        text="Skip Workout"
      />

      <Dialog visible={showDialog} onDismiss={() => setShowDialog(!showDialog)}>
        <Dialog.Title>Tips:</Dialog.Title>
        <Dialog.Content>
              <List.Section>
                <List.Item
                  left={() => <List.Icon color={colors.text} icon="check" />}
                  title="Press and hold the reps button to enter the number of reps manually."
                  titleNumberOfLines={3}
                />
                <List.Item
                  left={() => <List.Icon color={colors.text} icon="check" />}
                  title="Press and hold the weight to manually change the weight."
                  titleNumberOfLines={3}
                />
              </List.Section>
            </Dialog.Content>
        <Dialog.Actions>
          <ActionButton
            contained
            icon="check"
            labelStyle={{ fontSize: 20, textAlign: 'center' }}
            onPress={() => setShowDialog(!showDialog)}
            style={{ alignSelf: 'center', padding: 3, marginTop: 0 }}
            text=""
          />
        </Dialog.Actions>
      </Dialog>
    </ScrollView>
  )
}

const createStyles = (colors: ReactNativePaper.ThemeColors) => StyleSheet.create({
  button: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    margin: 10,
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  smallButton: {
    margin: 0,
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
})

export default WorkoutScreen
