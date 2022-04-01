import {
  Exercise,
  Log,
  Workout,
  WorkoutPlan
  } from '../types/workout';

export const finishWorkout = (workouts: Workout[], finishedWorkout: Workout): Workout[] | undefined => {
  return workouts.map(workout => {
    if (workout.id === finishedWorkout.id) {
      const exercises: Exercise[] = memoizeExercises(workout.exercises)
      return {...finishedWorkout, exercises: exercises} as Workout
    }

    return {...workout} as Workout
  })
}

export const memoizeExercises = (exercises: Exercise[]): Exercise[] => {
  return exercises.map(exercise => {
    if (exercise.progressiveOverload) {
      return { ...exercise, weight: exercise.weight + exercise.overloadIncrement } as Exercise
    }

    return {...exercise}
  })
}

export const incrementWorkoutIndex = (workoutPlan: WorkoutPlan): number => {
  let workoutIndex: number = (workoutPlan?.workoutIndex && workoutPlan?.workoutIndex >= 0) ? workoutPlan?.workoutIndex + 1 : 1
  if (workoutPlan?.workouts && workoutIndex >= workoutPlan?.workouts.length) {
    workoutIndex = 0
  }

  return workoutIndex
}

export const updateWorkoutPlan = (workoutPlan: WorkoutPlan | null, workouts: Workout[] | undefined, logs: Log[]): WorkoutPlan => {
  const workoutIndex: number = incrementWorkoutIndex(workoutPlan as WorkoutPlan)

  const newWorkoutPlan: WorkoutPlan = {
    workouts: workouts || [],
    daysPerWeek: workoutPlan?.daysPerWeek || 1,
    workoutIndex: workoutIndex,
    workoutInProgress: false,
    logs: logs,
  }

  return newWorkoutPlan
}

export const createWorkoutPlan = (): WorkoutPlan => {
  return {
    workouts: [],
    daysPerWeek: 1,
    workoutIndex: 0,
    workoutInProgress: false,
    logs: [],
  }
}
