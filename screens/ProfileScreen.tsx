import LogCard from '../components/LogCard'
import React, { useEffect } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View
  } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Log } from '../types/workout'
import { DatabaseContext } from '../context/DatabaseContext'
import { MongoDocument } from 'react-native-local-mongodb'

export const ProfileScreen = (): JSX.Element => {
  const [logs, setLogs] = React.useState<Log[]>([])
  const { colors } = useTheme()
  const styles = createStyles(colors)
  const { logsStore: db } = React.useContext(DatabaseContext)
  
  useEffect(() => {
    db.find({})
      .sort({ date: -1 })
      .limit(10)
      .exec((err: Error | null, docs: MongoDocument[]) => {
        if (err) {
          console.log(err.message)
          return
        }

        setLogs(docs as Log[])
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
        
        {logs.map((log, index) => (
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
