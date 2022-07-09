import AsyncStorage from '@react-native-async-storage/async-storage'
import Datastore from "react-native-local-mongodb"
import { DataStoreType } from "../types/common"

export const createStore = (storeType: DataStoreType) => {
  const filename = storeFilename(storeType)
  return new Datastore({ filename, storage: AsyncStorage, autoload: true })
}

const storeFilename = (storeType: DataStoreType) => {
  switch(storeType) {
    case DataStoreType.Logs:
      return 'workout-log.db'
    case DataStoreType.WorkoutPlan:
      return 'workout-plan.db'
    default:
      return ''
  }
}
