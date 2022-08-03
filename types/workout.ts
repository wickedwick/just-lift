export type Exercise = {
  id: string,
  name: string
  sets: number
  reps: number
  weight: number
  weightUnit: WeightUnit
  progressiveOverload: boolean
  overloadIncrement: number
}

export type Workout = {
  id: string
  exercises: Exercise[]
}

export type WorkoutPlan = {
  workouts: Workout[]
  daysPerWeek: number
  workoutIndex: number
  workoutInProgress: boolean
}

export type Log = {
  date: Date
  workoutId: string
  data: string
  exerciseName: string
  weight: number
  weightUnit: WeightUnit
}

export enum WeightUnit {
  Lbs,
  Kg
}
 