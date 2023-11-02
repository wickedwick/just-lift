import { exerciseFactory, changeWeight, updateExercises, removeExercise, replaceExercise } from '../exercise';
import { Exercise, WeightUnit, Workout, WorkoutPlan } from '../../types/workout';
import { createTestExercise, createTestExercises } from './exerciseFactory';

const exercises: Exercise[] = [
    {
        id: "test",
        name: 'test',
        sets: 5,
        reps: 10,
        weight: 10,
        progressiveOverload: false,
        overloadIncrement: 0,
        weightUnit: WeightUnit.Lbs,
    },
    {
        id: "test2",
        name: 'test2',
        sets: 5,
        reps: 10,
        weight: 10,
        progressiveOverload: true,
        overloadIncrement: 5,
        weightUnit: WeightUnit.Lbs,
    },
];

describe('exercise', () => {
    describe('createExercise', () => {
        it('creates an empty exercise', () => {
            const exercise = exerciseFactory();

            expect(exercise.name).toBe('');
            expect(exercise.sets).toBe(0);
            expect(exercise.reps).toBe(0);
        });

        it('creates an exercise with name', () => {
            const exercise = exerciseFactory( { name: 'glute flex' });

            expect(exercise.name).toBe('glute flex');
            expect(exercise.sets).toBe(0);
            expect(exercise.reps).toBe(0);
        });

        it('creates an exercise with sets and reps', () => {
            const exercise = exerciseFactory( { name: 'neck curls', sets: 5, reps: 20 });

            expect(exercise.name).toBe('neck curls');
            expect(exercise.sets).toBe(5);
            expect(exercise.reps).toBe(20);
        });
    });

    describe('updateExercise', () => {
        it('updates an Exercise in an array of Exercises', () => {
            const exercise: Exercise = {
                name: 'test',
                sets: 15,
                reps: 1,
                weight: 105,
                progressiveOverload: false,
                overloadIncrement: 0,
                weightUnit: WeightUnit.Lbs,
            };

            const newExercises: Exercise[] = updateExercises(exercises, exercise);
            expect(newExercises[0].sets).toBe(15);
            expect(newExercises[0].weight).toBe(105);
            expect(newExercises[0].reps).toBe(1);
        });
    });

    describe('changeWeight', () => {
        it('changes the weight of an Exercise', () => {
            const exercise: Exercise = {
                name: 'test',
                sets: 5,
                reps: 10,
                weight: 10,
                progressiveOverload: false,
                overloadIncrement: 0,
                weightUnit: WeightUnit.Lbs,
            };

            const newExercise: Exercise = {
                ...exercise,
                weight: 15,
            };

            const changedExercises: Exercise[] = changeWeight(exercises, 'test', 15);
            expect(changedExercises[0].weight).toBe(15);
        });
    });

    describe('removeExercise', () => {
        it('should handle out of range indexes', () => {
            const index = 53;
            const exercises = createTestExercises(1);

            const newExercises = removeExercise(index, exercises);
            expect(newExercises.length).toEqual(1);
        });

        it('should remove from the selected index', () => {
            const index = 1;
            const exercises = createTestExercises(3);

            const newExercises = removeExercise(index, exercises);
            expect(newExercises.length).toEqual(2);
        });
    });

    describe('replaceexercise', () => {
        it('should replace the exercise in the array', () => {
            const exercise = createTestExercise("test_1");
            exercise.reps = 10;
            exercise.name = "1_test";

            const exercises = createTestExercises(4);

            const workout: Workout = {
                id: "A",
                exercises
            };

            const workoutPlan: WorkoutPlan = {
                workouts: [workout],
                daysPerWeek: 3,
                workoutIndex: 0,
                workoutInProgress: false
            };

            expect(workoutPlan.workouts[0].exercises.find(e => e.name === "1_test")).toBeFalsy();

            replaceExercise(exercise, 0, workoutPlan);

            expect(workoutPlan.workouts[0].exercises.find(e => e.name === "1_test")).toBeTruthy();
        });
    });
});
