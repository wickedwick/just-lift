import Datastore from 'react-native-local-mongodb'
import { DataStoreType } from '../../types/common'
import { createStore } from '../data'

const mockTestConstructor = jest.fn()
jest.mock('Datastore', () => {
  // return {
  //   default: function() {
  //     return {
  //       Datastore: mockTestConstructor
  //     }
  //   }
  // }
  return {
    __esModule: true,
    // DataStore: {
      default: jest.fn().mockImplementation(() => {
        return { };
      })
    // }
  }
})

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
