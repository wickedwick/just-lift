import React, { useEffect } from 'react';
import { Button, Card, Text } from 'react-native-paper';
import { ExerciseCounterProps } from '../types/common';
import { Log, WeightUnit } from '../types/workout';
import { StyleSheet } from 'react-native';

const ExerciseCounter = (props: ExerciseCounterProps): JSX.Element => {
  const { exercise, setLogData } = props
  const [counts, setCounts] = React.useState<number[]>([])

  useEffect(() => {
    const newCounts = []
    for(let i = 0; i < exercise.reps; i++) {
      newCounts.push(0)
    }

    setCounts(newCounts)
  }, [exercise])

  const handleChange = (index: number) => {
    const newCounts = [...counts]

    if (newCounts[index] > 0) {
      newCounts[index]--
    } else {
      newCounts[index] = exercise.reps
    }

    setCounts(newCounts)
    const newLog: Log = {
      date: new Date(),
      workoutId: '',
      data: newCounts.join(', '),
      exerciseName: exercise.name,
      weight: exercise.weight,
      weightUnit: exercise.weightUnit,
    }

    setLogData(newLog)
  }

  return (
    <Card style={styles.card}>
      <Card.Title title={exercise.name} />
      <Card.Content>
        <Text>{exercise.reps} reps</Text>
        <Text style={styles.weightLabel}>{exercise.weight} {exercise.weightUnit === WeightUnit.Kg ? 'Kg' : 'Lbs'}</Text>
      </Card.Content>
      <Card.Content style={styles.flexContainer}>
        {[...Array(exercise.sets)].map((_, index) => (
          <Button
            key={index}
            mode='contained'
            compact
            style={styles.input}
            labelStyle={styles.buttonLabel}
            onPress={() => handleChange(index)}
          >
            {counts[index]}
          </Button>
        ))}
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
  },
  card: {
    marginTop: 5,
    marginBottom: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  removeButton: {
  },
  input: {
    marginBottom: 10,
    marginTop: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 3,
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weightLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    alignContent: 'center',
    margin: 0,
  },
})

export default ExerciseCounter
