import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Text,
  TextInput
  } from 'react-native-paper';
import { createLog } from '../services/logFactory';
import { ExerciseCounterProps } from '../types/common';
import { getNumberOrDefault } from '../services/utils';
import { Log, WeightUnit } from '../types/workout';
import { StyleSheet, TouchableOpacity } from 'react-native';

const ExerciseCounter = (props: ExerciseCounterProps): JSX.Element => {
  const [counts, setCounts] = React.useState<number[]>([])
  const { exercise, setLogData, setWeight } = props
  const [isEditingWeight, setIsEditingWeight] = React.useState<boolean>(false)
  const [repsEditingIndex, setRepsEditingIndex] = React.useState<number>(-1)

  useEffect(() => {
    const newCounts = []
    for(let i = 0; i < exercise.sets; i++) {
      newCounts.push(0)
    }

    setCounts(newCounts)
  }, [exercise])

  const handleChange = (index: number) => {
    let newCounts = [...counts]

    if (newCounts[index] > 0) {
      newCounts[index]--
    } else {
      newCounts[index] = exercise.reps
    }

    setCounts(newCounts)
    handleCreateLog()
  }

  const handleRepsChange = (text: string, index: number) => {
    const newReps = getNumberOrDefault(text)
    const newCounts = [...counts]
    newCounts[index] = newReps
    setCounts(newCounts)
  }

  const handleRepsEditingChange = () => {
    handleCreateLog()
    setRepsEditingIndex(-1)
  }

  const handleCreateLog = () => {
    const newLog: Log = createLog(exercise, counts)
    setLogData(newLog)
  }

  return (
    <Card style={styles.card}>
      <Card.Title title={exercise.name} />
      <Card.Content>
        <Text>{exercise.reps} reps</Text>

        <TouchableOpacity
          activeOpacity={0.6}
          onLongPress={() => { setIsEditingWeight(!isEditingWeight) }}
        >
          {isEditingWeight ? (
            <>
              <TextInput
                keyboardType={'numeric'}
                label={`Weight`}
                onChangeText={(text) => { setWeight(getNumberOrDefault(text), exercise.name) }}
                style={styles.textInput}
                value={exercise.weight.toString()}
              />
              <Button
                onPress={() => { setIsEditingWeight(!isEditingWeight) }}
              >
                Done
              </Button>
            </>
          ) : (
            <Text style={styles.weightLabel}>{exercise.weight} {exercise.weightUnit === WeightUnit.Kg ? 'Kg' : 'Lbs'}</Text>
          )}
        </TouchableOpacity>
      </Card.Content>

      <Card.Content style={styles.flexContainer}>
        {[...Array(exercise.sets)].map((_, index) => (
          <TouchableOpacity
            activeOpacity={0.6}
            key={index}
            onLongPress={() => { setRepsEditingIndex(index) }}
          >
            {repsEditingIndex === index ? (
              <>
                <TextInput
                  keyboardType={'numeric'}
                  label={`Reps`}
                  onChangeText={(text) => { handleRepsChange(text, index) }}
                  style={styles.textInput}
                  value={counts[index]?.toString()}
                />
                <Button
                  onPress={() => { handleRepsEditingChange() }}
                >
                  ✓
                </Button>
              </>
            ) : (
              <Button
                compact
                key={index}
                labelStyle={styles.buttonLabel}
                mode='contained'
                onPress={() => handleChange(index)}
                onLongPress={() => { setRepsEditingIndex(index) }}
                style={styles.input}
              >
                {counts[index]}
              </Button>
            )}
          </TouchableOpacity>
        ))}
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    alignContent: 'center',
    margin: 0,
  },
  card: {
    marginTop: 5,
    marginBottom: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: 10,
    marginTop: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 3,
  },
  removeButton: {
  },
  text: {
    fontSize: 18,
  },
  textInput: {
    marginBottom: 10,
    marginTop: 10,
    padding: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  weightLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
  },
})

export default ExerciseCounter
