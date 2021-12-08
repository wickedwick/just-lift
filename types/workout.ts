export type Exercise = {
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
  logs: Log[]
  workoutInProgress: boolean
}

export type Log = {
  date: Date
  workoutId: string
  data: string
  exerciseName: string
}

export enum WeightUnit {
  Lbs,
  Kg
}
 