import React, { useEffect, useState } from 'react'
import RepInputGroup from './RepInputGroup'
import WeightEditor from './WeightEditor'
import { Card, Text } from 'react-native-paper'
import { ExerciseCounterProps } from '../types/common'
import { StyleSheet } from 'react-native'

const ExerciseCounter = (props: ExerciseCounterProps): JSX.Element => {
  const { exercise, setLogData, setWeight } = props
  const [counts, setCounts] = useState<number[]>([])

  useEffect(() => {
    const newCounts = []
    for(let i = 0; i < exercise.sets; i++) {
      newCounts.push(0)
    }

    setCounts(newCounts)
  }, [exercise])

  return (
    <Card style={styles.card}>
      <Card.Title title={exercise.name} />
      <Card.Content>
        <Text>{exercise.reps} reps</Text>

        <WeightEditor
          exercise={exercise}
          setWeight={setWeight}
        />
      </Card.Content>

      <Card.Content style={styles.flexContainer}>
        <RepInputGroup
          counts={counts}
          exercise={exercise}
          setCounts={setCounts}
          setLogData={setLogData}
        />
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
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
})

export default ExerciseCounter
