import { Exercise, WeightUnit } from '../../types/workout'
import { createLog, addOrUpdateLog } from '../logFactory'

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

  describe('addOrUpdateLog', () => {
    const updatedExercise: Exercise = {
      name: 'new Test',
      sets: 5,
      reps: 10,
      weight: 10,
      progressiveOverload: false,
      overloadIncrement: 0,
      weightUnit: WeightUnit.Lbs,
    }

    it('should return a log array with new log appended', () => {
      const log = createLog(updatedExercise, [10, 9, 8])
      const logs = [createLog(exercise, [10, 5, 7]), createLog(exercise, [1, 1, 1])]
      const updatedLogs = addOrUpdateLog(log, logs)
      expect(updatedLogs[updatedLogs.length - 1].exerciseName).toEqual(log.exerciseName)
    })

    it('should return a log array with existing log updated', () => {
      const log = createLog(updatedExercise, [10, 9, 8])
      const logs = [log, createLog(exercise, [10, 99, 83]), createLog(exercise, [10, 19, 18])]
      const updatedLogs = addOrUpdateLog(log, logs)
      expect(updatedLogs[0].exerciseName).toEqual(log.exerciseName)
    })
  })
})
