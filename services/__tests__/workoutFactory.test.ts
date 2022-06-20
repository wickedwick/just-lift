import {
  Exercise,
  WeightUnit,
  Workout,
  WorkoutPlan
  } from '../../types/workout';
import {
  createWorkoutPlan,
  finishWorkout,
  incrementWorkoutIndex,
  memoizeExercises,
  setWorkoutPlanInProgress,
  updateWorkoutExercises,
  updateWorkoutPlan
  } from '../workoutFactory';

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

const workouts: Workout[] = [
  {
    id: '1',
    exercises
  },
  {
    id: '2',
    exercises
  }
]

const workoutPlan: WorkoutPlan = {
  workoutIndex: 0,
  workouts: workouts,
  daysPerWeek: 1,
  workoutInProgress: true,
}

describe('workoutFactory', () => {
  describe('finishWorkout', () => {
    it('creates a new Workout', () => {
      const newWorkouts: Workout[] = finishWorkout(workouts, workouts[0]) as Workout[]
      expect(newWorkouts[0].id).toBe('1')
      const newWorkout: Workout = newWorkouts?.[0] as Workout
      expect(newWorkout.exercises.find(e => e.name === 'test2')?.weight).toBe(15)
    })
  })

  describe('memoizeExercises', () => {
    it('increments the weight of an exercise', () => {
      const exercises: Exercise[] = [{
        name: 'test',
        sets: 5,
        reps: 10,
        weight: 10,
        progressiveOverload: true,
        overloadIncrement: 5,
        weightUnit: WeightUnit.Lbs,
      }]

      const newExercises: Exercise[] | undefined = memoizeExercises(exercises) as Exercise[]
      expect(newExercises[0].weight).toBe(15)
    })
  })

  describe('incrementWorkoutIndex', () => {
    it('Returns the workoutIndex incremented by 1', () => {
      const newWorkoutIndex = incrementWorkoutIndex(workoutPlan)
      expect(newWorkoutIndex).toBe(1)
    })
  })

  describe('updateWorkoutPlan', () => {
    it('Returns a new workoutPlan', () => {
      const newWorkoutPlan: WorkoutPlan = updateWorkoutPlan(workoutPlan, workoutPlan.workouts, [])
      expect(newWorkoutPlan.workoutIndex).toBe(1)
      expect(newWorkoutPlan.workoutInProgress).toBe(false)
    })
  })

  describe('updateWorkoutExercises', () => {
    it('Returns a new workout', () => {
      const newWorkout: Workout = {
        id: '1',
        exercises: [{
          name: 'test',
          sets: 5,
          reps: 10,
          weight: 10,
          progressiveOverload: true,
          overloadIncrement: 5,
          weightUnit: WeightUnit.Lbs,
        }]
      }

      const updatedWorkout: Workout = updateWorkoutExercises(newWorkout, exercises)
      expect(updatedWorkout.exercises.length).toBe(2)
    })
  })

  describe('createWorkoutPlan', () => {
    it('Returns a new workoutPlan', () => {
      const newWorkoutPlan: WorkoutPlan = createWorkoutPlan(1, workouts)
      expect(newWorkoutPlan.workoutIndex).toBe(0)
      expect(newWorkoutPlan.workoutInProgress).toBe(false)
      expect(newWorkoutPlan.daysPerWeek).toBe(1)
      expect(newWorkoutPlan.workouts.length).toBe(workouts.length)
    })
  })

  describe('setWorkoutPlanInProgress', () => {
    it('Returns the same workout plan with workoutInProgress set to true', () => {
      const newWorkoutPlan: WorkoutPlan = {
        ...workoutPlan,
        workoutInProgress: false
      }
      const updatedWorkoutPlan: WorkoutPlan = setWorkoutPlanInProgress(newWorkoutPlan)
      expect(updatedWorkoutPlan.workoutInProgress).toBe(true)
      expect(updatedWorkoutPlan.workoutIndex).toBe(newWorkoutPlan.workoutIndex)
      expect(updatedWorkoutPlan.daysPerWeek).toBe(newWorkoutPlan.daysPerWeek)
      expect(updatedWorkoutPlan.workouts.length).toBe(newWorkoutPlan.workouts.length)
    })
  })
})
