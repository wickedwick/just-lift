import { Workout } from "../../types/workout";
import { createTestExercises } from "./exerciseFactory";

export const createTestWorkout = (id: string): Workout => {
    return {
        id,
        exercises: createTestExercises(4)
    };
};

export const createTestWorkouts = (length: number): Workout[] => {
    const workouts: Workout[] = [];

    for (let i = 0; i < length; i++) {
        workouts.push(createTestWorkout(`test_workout_${i}`));
    }

    return workouts;
};