import ActionButton from '../components/ActionButton';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TabOneParamList } from '../types/common';

export default function SelectWorkoutScreen({
  navigation
}: StackScreenProps<TabOneParamList, 'SelectWorkoutScreen'>): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ActionButton
        contained
        onPress={() => navigation.navigate('GuidedSelectionScreen')}
        text="Guided"
        style={styles.button}
      />
      <ActionButton
        contained
        onPress={() => navigation.navigate('WorkoutListScreen')}
        text="Select from List"
        style={styles.button}
      />
      <ActionButton
        onPress={() => navigation.navigate('BlankMenuScreen')}
        text="Menu"
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 30,
  },
  button: {
    marginBottom: 10,
  }
})
