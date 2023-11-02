import ActionButton from './ActionButton'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { createGroups, getNumberOrDefault } from '../services/utils'
import { createLog } from '../services/log'
import { Log } from '../types/workout'
import { RepInputGroupProps } from '../types/common'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const RepInputGroup = (props: RepInputGroupProps): JSX.Element => {
  const { counts, exercise, setCounts, setLogData } = props
  const [repsEditingIndex, setRepsEditingIndex] = useState<number>(-1)

  const onChange = (index: number) => {
    let newCounts = [...counts]

    if (newCounts[index] > 0) {
      newCounts[index]--
    } else {
      newCounts[index] = exercise.reps
    }

    setCounts(newCounts)
    onCreateLog(newCounts)
  }

  const onRepsChange = (text: string, index: number) => {
    const newReps = getNumberOrDefault(text)
    const newCounts = [...counts]
    newCounts[index] = newReps
    setCounts(newCounts)
  }

  const onRepsEditingChange = () => {
    onCreateLog(counts)
    setRepsEditingIndex(-1)
  }

  const onCreateLog = (newCounts: number[]) => {
    const newLog: Log = createLog(exercise, newCounts)
    setLogData(newLog)
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      {createGroups([...Array(exercise.sets).fill(0)], 7)
        .map((group: number[], outerIndex) => {
          return (
            <View style={styles.flexContainer} key={outerIndex}>
            {group.map((_, index) => (
              <TouchableOpacity
                activeOpacity={0.6}
                key={index}
                onLongPress={() => { setRepsEditingIndex(index) }}
              >
                {repsEditingIndex === (outerIndex * 7) + index ? (
                  <>
                    <TextInput
                      keyboardType={'numeric'}
                      label={`Reps`}
                      onChangeText={(text) => { onRepsChange(text, (outerIndex * 7) + index) }}
                      style={{ ...styles.textInput, marginBottom: 0 }}
                      value={counts[(outerIndex * 7) + index]?.toString()}
                    />
                    <ActionButton
                      contained
                      icon="check"
                      labelStyle={{ fontSize: 20, textAlign: 'center' }}
                      onPress={() => { onRepsEditingChange() }}
                      style={{ alignSelf: 'center', padding: 3, marginTop: 0 }}
                      text=""
                    />
                  </>
                ) : (
                  <Button
                    compact
                    key={index}
                    labelStyle={styles.buttonLabel}
                    mode='contained'
                    onPress={() => onChange((outerIndex * 7) + index)}
                    onLongPress={() => { setRepsEditingIndex((outerIndex * 7) + index) }}
                    style={styles.input}
                  >
                    {counts[(outerIndex * 7) + index]}
                  </Button>
                )}
              </TouchableOpacity>)
            )}
            </View>
          )
        }
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    alignContent: 'center',
    margin: 0,
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
  textInput: {
    marginBottom: 10,
    marginTop: 10,
    padding: 3,
  },
})

export default RepInputGroup
