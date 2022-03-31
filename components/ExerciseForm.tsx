import ActionButton from './ActionButton';
import DropDown from 'react-native-paper-dropdown';
import React from 'react';
import {
  Switch,
  Text,
  TextInput,
  useTheme
  } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { WeightUnit } from '../types/workout';
import { WorkoutFormProps } from '../types/common';

const ExerciseForm = (props: WorkoutFormProps): JSX.Element => {
  const { exercise, onSubmit, onCancel } = props
  const weightUnits = [
    { value: WeightUnit.Lbs, label: 'Lbs' },
    { value: WeightUnit.Kg, label: 'Kg' },
  ]
  const [showDropDown, setShowDropDown] = React.useState(false)
  const [name, setName] = React.useState(exercise?.name || '')
  const [sets, setSets] = React.useState(exercise?.sets || 0)
  const [reps, setReps] = React.useState(exercise?.reps || 0)
  const [weight, setWeight] = React.useState(exercise?.weight || 0)
  const [weightUnit, setWeightUnit] = React.useState(exercise?.weightUnit || WeightUnit.Lbs)
  const [progressiveOverload, setProgressiveOverload] = React.useState(exercise?.progressiveOverload || false)
  const [overloadIncrement, setOverloadIncrement] = React.useState(exercise?.overloadIncrement || 0)
  const { colors } = useTheme()
  const styles = createStyles(colors)

  const onSubmitPress = () => {
    onSubmit({
      name,
      sets,
      reps,
      weight,
      weightUnit,
      progressiveOverload,
      overloadIncrement,
    })
  }

  return (
    <View>
      <TextInput
        label={`Exercise name`}
        value={name}
        onChangeText={(text) => { setName(text) }}
        style={styles.input}
      />
      <TextInput
        label={`Sets`}
        value={sets.toString()}
        onChangeText={(text) => { setSets(parseInt(text)) }}
        style={styles.input}
        keyboardType={'numeric'}
        />
      <TextInput
        label={`Reps`}
        value={reps.toString()}
        onChangeText={(text) => { setReps(parseInt(text)) }}
        style={styles.input}
        keyboardType={'numeric'}
        />
      <TextInput
        label={`Weight`}
        value={weight.toString()}
        onChangeText={(text) => { setWeight(parseInt(text)) }}
        style={styles.input}
        keyboardType={'numeric'}
      />
      <DropDown
        label={'Weight Unit'}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={weightUnit}
        setValue={(val) => { setWeightUnit(val) }}
        list={weightUnits}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Progressive Overload</Text>
        <Switch
          color={colors.primary}
          style={styles.switch}
          value={progressiveOverload}
          onValueChange={() => { setProgressiveOverload(!progressiveOverload) }}
        />
      </View>
      <TextInput
        label={`Weight Increment Amount`}
        value={overloadIncrement.toString()}
        onChangeText={(text) => { setOverloadIncrement(parseInt(text)) }}
        style={styles.input}
        keyboardType={'numeric'}
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
  switch: {
    marginBottom: 10,
    marginTop: 10,
  },
  label: {
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
