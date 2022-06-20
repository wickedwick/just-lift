import AsyncStorage from '@react-native-async-storage/async-storage'
import Datastore from 'react-native-local-mongodb'
import React from 'react'

export const DatabaseContext = React.createContext({
  logsStore: new Datastore({ filename: 'workout-log.db', storage: AsyncStorage, autoload: true }),
  workoutPlanStore: new Datastore({ filename: 'workout-plan.db', storage: AsyncStorage, autoload: true }),
})
