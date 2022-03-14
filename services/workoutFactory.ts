import { Exercise, Log, Workout, WorkoutPlan } from '../types/workout';

export const finishWorkout = (workouts: Workout[], finishedWorkout: Workout): Workout[] | undefined => {
  const newWorkouts = workouts.map(workout => {
    if (workout.id === finishedWorkout.id) {
      const exercises: Exercise[] | undefined = incrementProgressiveOverload(workout.exercises)
      return {...finishedWorkout, exercises: exercises} as Workout
    }

    return {...workout} as Workout
  })

  return newWorkouts
}

export const incrementProgressiveOverload = (exercises: Exercise[]): Exercise[] | undefined => {
  const newExercises: Exercise[] = exercises.map(exercise => {
    if (exercise.progressiveOverload) {
      return { ...exercise, weight: exercise.weight + exercise.overloadIncrement } as Exercise
    }

    return {...exercise}
  })

  return newExercises
}

export const incrementWorkoutIndex = (workoutPlan: WorkoutPlan): number => {
  let workoutIndex = (workoutPlan?.workoutIndex && workoutPlan?.workoutIndex >= 0) ? workoutPlan?.workoutIndex + 1 : 1
  if (workoutPlan?.workouts && workoutIndex >= workoutPlan?.workouts.length) {
    workoutIndex = 0
  }

  return workoutIndex
}

export const updateWorkoutPlan = (workoutPlan: WorkoutPlan | null, workouts: Workout[] | undefined, logs: Log[]): WorkoutPlan => {
  const workoutIndex = incrementWorkoutIndex(workoutPlan as WorkoutPlan)

  const newWorkoutPlan: WorkoutPlan = {
    workouts: workouts || [],
    daysPerWeek: workoutPlan?.daysPerWeek || 1,
    workoutIndex: workoutIndex,
    workoutInProgress: false,
    logs: logs,
  }

  return newWorkoutPlan
}
