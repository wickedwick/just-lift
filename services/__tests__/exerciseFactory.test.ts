import { changeWeight, updateExercises } from '../exerciseFactory';
import { Exercise, WeightUnit } from '../../types/workout';

const exercises: Exercise[] = [
  {
    name: 'test',
    sets: 5,
    reps: 10,
    weight: 10,
    progressiveOverload: false,
    overloadIncrement: 0,
    weightUnit: WeightUnit.Lbs,
  },
  {
    name: 'test2',
    sets: 5,
    reps: 10,
    weight: 10,
    progressiveOverload: true,
    overloadIncrement: 5,
    weightUnit: WeightUnit.Lbs,
  }
]

describe('exerciseFactory', () => {
  describe('updateExercise', () => {
    it('updates an Exercise in an array of Exercises', () => {
      const exercise: Exercise = {
        name: 'test',
        sets: 15,
        reps: 1,
        weight: 105,
        progressiveOverload: false,
        overloadIncrement: 0,
        weightUnit: WeightUnit.Lbs,
      }

      const newExercises: Exercise[] = updateExercises(exercises, exercise)
      expect(newExercises[0].sets).toBe(15)
      expect(newExercises[0].weight).toBe(105)
      expect(newExercises[0].reps).toBe(1)
    })
  })

  describe('changeWeight', () => {
    it('changes the weight of an Exercise', () => {
      const exercise: Exercise = {
        name: 'test',
        sets: 5,
        reps: 10,
        weight: 10,
        progressiveOverload: false,
        overloadIncrement: 0,
        weightUnit: WeightUnit.Lbs,
      }

      const newExercise: Exercise = {
        ...exercise,
        weight: 15,
      }

      const changedExercises: Exercise[] = changeWeight(exercises, 'test', 15)
      expect(changedExercises[0].weight).toBe(15)
    })
  })
})