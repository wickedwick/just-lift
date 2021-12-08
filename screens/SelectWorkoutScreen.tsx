import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import { TabOneParamList } from '../types/common'

export default function SelectWorkoutScreen({
  navigation
}: StackScreenProps<TabOneParamList, 'SelectWorkoutScreen'>): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>SelectWorkoutScreen</Text>
      <Button
        mode='contained'
        onPress={() => navigation.navigate('BlankMenuScreen')}
      >
        Menu
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
})
