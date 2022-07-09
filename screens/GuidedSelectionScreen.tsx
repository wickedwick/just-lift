import ActionButton from '../components/ActionButton';
import Checkbox from '../components/Checkbox';
import RadioButton from '../components/RadioButton';
import React from 'react';
import { createWorkoutPlan } from '../services/workoutFactory';
import { getNumberOrDefault } from '../services/utils';
import { RadioButton as PaperRadioButton, Text, TextInput } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TabOneParamList } from '../types/common';

// TODO: WORK IN PROGRESS; SLATED FOR LATER VERSION
export default function GuidedSelectionScreen({
  navigation
}: StackScreenProps<TabOneParamList, 'GuidedSelectionScreen'>): JSX.Element {
  const [isBeginner, setIsBeginner] = React.useState(true)
  const [equipment, setEquipment] = React.useState<string[]>([])
  const [goals, setGoals] = React.useState<string[]>([])
  const [numDays, setNumDays] = React.useState<number>(3)

  const handleEquipment = (value: string): void => {
    if (equipment.includes(value)) {
      const newEquipment = equipment.filter(item => item !== value)
      setEquipment([...newEquipment])
      return
    }

    setEquipment([...equipment, value])
  }

  const handleGoals = (value: string): void => {
    if (goals.includes(value)) {
      const newGoals = goals.filter(item => item !== value)
      setGoals([...newGoals])
      return
    }

    setGoals([...goals, value])
  }

  const handleCreateWorkout = (): void => {
    console.log('create workout')
    createWorkoutPlan()
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Choose your experience level</Text>
      <PaperRadioButton.Group onValueChange={newValue => setIsBeginner(newValue === 'true')} value={isBeginner ? 'true' : 'false'}>
        <View style={styles.radioRow}>
          <RadioButton value="true" label="Beginner" />
          <RadioButton value="false" label="Advanced" />
        </View>
      </PaperRadioButton.Group>

      <Text style={styles.heading}>Choose your equipment</Text>
      <View style={styles.radioRow}>
        <Checkbox label="Dumbbells" status={equipment.includes('dumbbells') ? 'checked' : 'unchecked'} onPress={() => handleEquipment('dumbbells')} />
        <Checkbox label="Barbell" status={equipment.includes('barbell') ? 'checked' : 'unchecked'} onPress={() => handleEquipment('barbell')} />
      </View>
      
      <View style={styles.radioRow}>
        <Checkbox label="Pullup Bar" status={equipment.includes('pullupBar') ? 'checked' : 'unchecked'} onPress={() => handleEquipment('pullupBar')} />
        <Checkbox label="Kettle Bells" status={equipment.includes('kettleBells') ? 'checked' : 'unchecked'} onPress={() => handleEquipment('kettleBells')} />
      </View>
      
      <View style={styles.radioRow}>
        <Checkbox label="Resistence Straps" status={equipment.includes('resistenceStraps') ? 'checked' : 'unchecked'} onPress={() => handleEquipment('resistenceStraps')} />
      </View>

      <Text style={styles.heading}>Choose your goals</Text>
      <View style={styles.radioRow}>
        <Checkbox label="Strength" status={goals.includes('strength') ? 'checked' : 'unchecked'} onPress={() => handleGoals('strength')} />
        <Checkbox label="Weight Loss" status={goals.includes('weightLoss') ? 'checked' : 'unchecked'} onPress={() => handleGoals('weightLoss')} />
      </View>
      
      <View style={styles.radioRow}>
        <Checkbox label="Endurance" status={goals.includes('endurance') ? 'checked' : 'unchecked'} onPress={() => handleGoals('endurance')} />
      </View>

      <Text style={styles.heading}>How many days per week?</Text>
      <View>
        <TextInput value={numDays.toString()} onChangeText={(text) => setNumDays(getNumberOrDefault(text))} />
      </View>

      <ActionButton
        contained
        onPress={handleCreateWorkout}
        text="Let's Go!"
        style={styles.button}
      />
      
      <ActionButton
        onPress={() => navigation.navigate('SelectWorkoutScreen')}
        text="Back"
        style={styles.button}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  radioRow: {
    flexDirection: 'row',
  },
  button: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 20,
  },
})
