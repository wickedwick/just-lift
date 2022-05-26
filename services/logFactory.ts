import { Exercise, Log } from '../types/workout'

export const createLog = (exercise: Exercise, counts: Number[]): Log => {
  return {
    data: counts.join(', '),
      date: new Date(),
      exerciseName: exercise.name,
      weight: exercise.weight,
      weightUnit: exercise.weightUnit,
      workoutId: '',
  }
}
