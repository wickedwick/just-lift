import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import LogCard from '../components/LogCard'
import { getItemAsync } from '../services/persistence'
import { TabOneParamList } from '../types/common'
import { WorkoutPlan } from '../types/workout'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ProfileScreen = ({ navigation }: StackScreenProps<TabOneParamList, 'ProfileScreen'>): JSX.Element => {
  const [workoutPlan, setWorkoutPlan] = React.useState<WorkoutPlan | null>(null)
  const { colors } = useTheme()
  const styles = createStyles(colors)
  
  useEffect(() => {
    getItemAsync<WorkoutPlan>('workoutPlan').then(value => {
      const workoutPlan: WorkoutPlan = value
      setWorkoutPlan(workoutPlan)
    })
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.heading}>My Profile</Text>
        <Text style={styles.text}>
          Edit your profile information here.
        </Text>
      </View>
      <View>
        <Text style={styles.heading}>My Workouts</Text>
        <Text style={styles.text}>
          View your workouts here.
        </Text>
        {workoutPlan?.logs.map((log, index) => (
          <LogCard key={index} log={log} />
        ))}
      </View>
    </ScrollView>
  )
}

const createStyles = (colors: ReactNativePaper.ThemeColors) => StyleSheet.create({
  container: {
    margin: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: colors.text,
  },
  text: {
    color: colors.text,
  }
})

export default ProfileScreen
