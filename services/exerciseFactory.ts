import { Exercise } from '../types/workout'

export const updateExercises = (exercises: Exercise[], exercise: Exercise): Exercise[] => {
  return exercises.map(e => {
    if (e.name === exercise.name) {
      return exercise
    }

    return e
  })
}

export const changeWeight = (exercises: Exercise[], exerciseName: string, weight: number): Exercise[] => {
  return exercises.map(e => {
    if (e.name === exerciseName) {
      return {
        ...e,
        weight: weight,
      }
    }

    return e
  })
}
