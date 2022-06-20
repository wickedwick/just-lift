import ActionButton from '../components/ActionButton'
import React from 'react'
import { Button, Card, useTheme } from 'react-native-paper'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { TabOneParamList } from '../types/common'
import { DatabaseContext } from '../context/DatabaseContext'
import { WorkoutPlanContext } from '../context/WorkoutPlanContext'

const SettingsScreen = ({ navigation }: StackScreenProps<TabOneParamList, 'SettingsScreen'>): JSX.Element => {
  const { colors } = useTheme()
  const styles = createStyles(colors)
  const { workoutPlanStore } = React.useContext(DatabaseContext)
  const { setWorkoutPlan } = React.useContext(WorkoutPlanContext)

  const handleRemoveWorkoutPlan = async () => {
    await workoutPlanStore.removeAsync({})
    setWorkoutPlan(null)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <Card style={styles.card}>
        <Card.Title title='Delete Workout Plan' subtitle="WARNING: This removes all data, including your log history" />
        <Card.Content>
          <Button mode="contained" color="red" onPress={handleRemoveWorkoutPlan}>Delete</Button>
        </Card.Content>
      </Card>

      <Text style={styles.heading}>View Your Profile</Text>
      
      <ActionButton
        contained
        onPress={() => navigation.navigate('ProfileScreen')}
        text="Profile"
      />
    </ScrollView>
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
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginTop: 5,
    marginBottom: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: colors.text,
  }
})

export default SettingsScreen