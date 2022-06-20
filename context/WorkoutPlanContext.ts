import React from 'react'
import { WorkoutPlanContextProps } from '../types/common'

export const WorkoutPlanContext = React.createContext<WorkoutPlanContextProps>({
  workoutPlan: null,
  setWorkoutPlan: () => {},
})
