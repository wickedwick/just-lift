import AsyncStorage from '@react-native-async-storage/async-storage'
import Datastore from 'react-native-local-mongodb'
import React from 'react'

export const DatabaseContext = React.createContext({
  db: new Datastore({ filename: 'workout-log.db', storage: AsyncStorage, autoload: true }),
})
