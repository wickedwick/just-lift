import Datastore from 'react-native-local-mongodb'
import { DataStoreType } from '../../types/common'
import { createStore } from '../data'

describe('data', () => {
  describe('dataStoreFactory', () => {
    it('creates a logsStore instance', () => {
      const logsStore = createStore(DataStoreType.Logs)
      expect(logsStore).toBeInstanceOf(Datastore)
    })

    it('creates a workoutPlanStore instance', () => {
      const logsStore = createStore(DataStoreType.WorkoutPlan)
      expect(logsStore).toBeInstanceOf(Datastore)
    })
  })
})
