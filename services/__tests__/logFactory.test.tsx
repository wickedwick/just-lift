import { Exercise, WeightUnit } from '../../types/workout'
import { createLog } from '../logFactory'

const exercise: Exercise = {
  name: 'test',
  sets: 5,
  reps: 10,
  weight: 10,
  progressiveOverload: false,
  overloadIncrement: 0,
  weightUnit: WeightUnit.Lbs,
}

describe('logFactory', () => {
  describe('createLog', () => {
    it('should return a log', () => {
      const log = createLog(exercise, [10, 9, 8])
      expect(log.data).toEqual('10, 9, 8')
      expect(log.exerciseName).toEqual('test')
      expect(log.weight).toEqual(10)
    })
  })
})
