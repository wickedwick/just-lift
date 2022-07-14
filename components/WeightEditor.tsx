import ActionButton from './ActionButton'
import React, { useState } from 'react'
import { getNumberOrDefault } from '../services/utils'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { WeightEditorProps } from '../types/common'
import { WeightUnit } from '../types/workout'

const WeightEditor = (props: WeightEditorProps): JSX.Element => {
  const { exercise, setWeight } = props
  const [isEditingWeight, setIsEditingWeight] = useState<boolean>(false)

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onLongPress={() => { setIsEditingWeight(!isEditingWeight) }}
    >
      {isEditingWeight ? (
        <View style={styles.flexContainer}>
          <TextInput
            keyboardType={'numeric'}
            label={`Weight`}
            onChangeText={(text) => { setWeight(getNumberOrDefault(text), exercise.name) }}
            style={styles.weightTextInput}
            value={exercise.weight.toString()}
          />
          <ActionButton
            contained
            icon="check"
            labelStyle={{ fontSize: 20, textAlign: 'center' }}
            onPress={() => { setIsEditingWeight(!isEditingWeight) }}
            style={{ alignSelf: 'center', padding: 3 }}
            text=""
          />
        </View>
      ) : (
        <Text style={styles.weightLabel}>{exercise.weight} {exercise.weightUnit === WeightUnit.Kg ? 'Kg' : 'Lbs'}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
  weightTextInput: {
    marginBottom: 10,
    marginTop: 10,
    padding: 3,
    width: '75%'
  },
})

export default WeightEditor
