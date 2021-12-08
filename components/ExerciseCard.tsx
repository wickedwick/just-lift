import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import { ExerciseCardProps } from '../types/common'
import { WeightUnit } from '../types/workout'

const ExerciseCard = (props: ExerciseCardProps): JSX.Element => {
  const { exercise, onEditPress, onRemovePress } = props
  const { name, sets, reps, weight, weightUnit, progressiveOverload, overloadIncrement } = exercise

  return (
    <Card style={styles.card}>
      <Card.Title title={name} />
      <Card.Content>
        <Text style={styles.text}>{sets} sets of {reps} reps</Text>
        <Text style={styles.text}>{weight} {WeightUnit[weightUnit]}</Text>
        <Text style={styles.text}>{progressiveOverload ? `Adding ${overloadIncrement} ${WeightUnit[weightUnit]} every workout` : ''}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => onRemovePress()} style={styles.removeButton}>Remove</Button>
        <Button onPress={() => onEditPress()} style={styles.removeButton}>Edit</Button>
      </Card.Actions>
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
})

export default ExerciseCard
