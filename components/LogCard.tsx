import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { LogCardProps } from '../types/common'

const LogCard = (props: LogCardProps): JSX.Element => {
  const { log } = props
  const { data, date, exerciseName } = log

  return (
    <Card style={styles.card}>
      <Card.Title title={exerciseName} />
      <Card.Content>
        <Text style={styles.text}>{date}</Text>
        <Text style={styles.text}>{data}</Text>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
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
})

export default LogCard