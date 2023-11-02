import { Exercise, WeightUnit } from "../../types/workout";

export const createTestExercise = (name: string): Exercise => {
    return {
        id: name,
        name: name,
        sets: 5,
        reps: 10,
        weight: 10,
        progressiveOverload: false,
        overloadIncrement: 0,
        weightUnit: WeightUnit.Lbs,
    };
};

export const createTestExercises = (length: number): Exercise[] => {
    const exercises: Exercise[] = [];

    for (let i = 0; i < length; i++) {
        exercises.push(createTestExercise(`test_${i}`));
    }

    return exercises;
};