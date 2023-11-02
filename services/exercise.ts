import { ExerciseFactoryProps } from '../types/common';
import { Exercise, WeightUnit, WorkoutPlan } from '../types/workout';

export const exerciseFactory = (props?: ExerciseFactoryProps): Exercise => {
    return {
        name: props?.name || '',
        sets: props?.sets || 0,
        reps: props?.reps || 0,
        weight: 0,
        weightUnit: WeightUnit.Lbs,
        progressiveOverload: false,
        overloadIncrement: 0,
    }
};

export const updateExercises = (exercises: Exercise[], exercise: Exercise): Exercise[] => {
    return exercises.map((e) => {
        if (e.id === exercise.id || e.name === exercise.name) {
            return exercise;
        }

        return e;
    });
};

export const changeWeight = (
    exercises: Exercise[],
    exerciseName: string,
    weight: number
): Exercise[] => {
    return exercises.map((e) => {
        if (e.name === exerciseName) {
            return {
                ...e,
                weight: weight,
            };
        }

        return e;
    });
};

export const removeExercise = (indexToRemove: number, exercises: Exercise[]): Exercise[] => {
    return exercises.filter((_, index) => indexToRemove !== index);
};

export const replaceExercise = (exercise: Exercise, workoutIndex: number, workoutPlan: WorkoutPlan | null): void => {
    if (!exercise) {
        return;
    }

    if (!workoutPlan) {
        return;
    }

    if (!workoutPlan.workouts.length) {
        workoutPlan.workouts = [];
    }

    if (!workoutPlan.workouts[workoutIndex].exercises.length) {
        workoutPlan.workouts[workoutIndex].exercises = [];
    }

    workoutPlan.workouts[workoutIndex].exercises = updateExercises(
        workoutPlan.workouts[workoutIndex].exercises,
        exercise
    );
};
