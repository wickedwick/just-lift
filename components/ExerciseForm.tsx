import ActionButton from './ActionButton'
import DropDown from 'react-native-paper-dropdown'
import React from 'react'
import { getNumberOrDefault } from '../services/utils'
import { StyleSheet, View } from 'react-native'
import {
  Switch,
  Text,
  TextInput,
  useTheme
  } from 'react-native-paper'
import { WeightUnit } from '../types/workout'
import { WorkoutFormProps } from '../types/common'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'

const ExerciseForm = (props: WorkoutFormProps): JSX.Element => {
  const { exercise, onSubmit, onCancel } = props
  const weightUnits = [
    { value: WeightUnit.Lbs, label: 'Lbs' },
    { value: WeightUnit.Kg, label: 'Kg' },
  ]

  const [name, setName] = React.useState(exercise?.name || '')
  const [overloadIncrement, setOverloadIncrement] = React.useState(exercise?.overloadIncrement || 0)
  const [progressiveOverload, setProgressiveOverload] = React.useState(exercise?.progressiveOverload || false)
  const [reps, setReps] = React.useState(exercise?.reps || 0)
  const [sets, setSets] = React.useState(exercise?.sets || 0)
  const [showDropDown, setShowDropDown] = React.useState(false)
  const [weight, setWeight] = React.useState(exercise?.weight || 0)
  const [weightUnit, setWeightUnit] = React.useState(exercise?.weightUnit || WeightUnit.Lbs)
  
  const { colors } = useTheme()
  const styles = createStyles(colors)

  const onSubmitPress = () => {
    onSubmit({
      id: exercise?.id || nanoid(),
      name,
      overloadIncrement,
      progressiveOverload,
      reps,
      sets,
      weight,
      weightUnit,
    })
  }

  return (
    <View>
      <TextInput
        label={`Exercise name`}
        onChangeText={(text) => { setName(text) }}
        style={styles.input}
        value={name}
      />

      <TextInput
        keyboardType={'numeric'}
        label={`Sets`}
        onChangeText={(text) => { setSets(getNumberOrDefault(text)) }}
        style={styles.input}
        value={sets.toString()}
      />
      
      <TextInput
        keyboardType={'numeric'}
        label={`Reps`}
        onChangeText={(text) => { setReps(getNumberOrDefault(text)) }}
        style={styles.input}
        value={reps.toString()}
      />
      
      <TextInput
        keyboardType={'numeric'}
        label={`Weight`}
        onChangeText={(text) => { setWeight(getNumberOrDefault(text)) }}
        style={styles.input}
        value={weight.toString()}
      />
      
      <DropDown
        label={'Weight Unit'}
        list={weightUnits}
        onDismiss={() => setShowDropDown(false)}
        setValue={(val) => { setWeightUnit(val) }}
        showDropDown={() => setShowDropDown(true)}
        value={weightUnit}
        visible={showDropDown}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Progressive Overload</Text>
        
        <Switch
          color={colors.primary}
          onValueChange={() => { setProgressiveOverload(!progressiveOverload) }}
          style={styles.switch}
          value={progressiveOverload}
        />
      </View>

      <TextInput
        keyboardType={'numeric'}
        label={`Weight Increment Amount`}
        onChangeText={(text) => { setOverloadIncrement(getNumberOrDefault(text)) }}
        style={styles.input}
        value={overloadIncrement.toString()}
      />

      <ActionButton
        contained
        onPress={() => onSubmitPress()}
        text="Submit"
      />
      
      <ActionButton
        onPress={() => onCancel()}
        text="Cancel"
      />
    </View>
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
    backgroundColor: colors.surface,
  },
  label: {
    marginTop: 10,
  },
  switch: {
    marginBottom: 10,
    marginTop: 10,
  },
  switchContainer: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#20232a',
    padding: 5,
    paddingLeft: 10,
    backgroundColor: colors.surface,
  }
})

export default ExerciseForm
