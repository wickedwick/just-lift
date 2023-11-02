import ActionButton from '../components/ActionButton';
import Datastore from 'react-native-local-mongodb';
import ExerciseCard from '../components/ExerciseCard';
import ExerciseForm from '../components/ExerciseForm';
import PagingControls from '../components/PagingControls';
import React, { useContext, useEffect, useState } from 'react';
import { createStore } from '../services/data';
import { createWorkoutPlan } from '../services/workout';
import { DataStoreType, TabOneParamList } from '../types/common';
import { Exercise, Workout, WorkoutPlan } from '../types/workout';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { removeExercise, replaceExercise, updateExercises } from '../services/exercise';
import { WorkoutPlanContext } from '../context/WorkoutPlanContext';

export default function CreateWorkoutScreen({
    navigation,
}: StackScreenProps<TabOneParamList, 'CreateWorkoutScreen'>): JSX.Element {
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [showExerciseForm, setShowExerciseForm] = useState(false);
    const [workoutIndex, setWorkoutIndex] = useState(0);
    const { workoutPlan, setWorkoutPlan } = useContext(WorkoutPlanContext);
    const workoutPlanStore: Datastore = createStore(DataStoreType.WorkoutPlan);
    const styles = createStyles();

    useEffect(() => {
        if (!workoutPlan) {
            const newWorkoutPlan = createWorkoutPlan(0, []);
            setWorkoutPlan(newWorkoutPlan);
        }
    }, []);

    const onExerciseFormSubmit = (exercise: Exercise) => {
        if (selectedExercise) {
            replaceExercise(exercise, workoutIndex, workoutPlan);
            setSelectedExercise(null);
            setShowExerciseForm(false);
            return;
        }

        workoutPlan?.workouts[workoutIndex].exercises.push(exercise);
        setShowExerciseForm(false);
    };

    const onEditExercise = (index: number) => {
        if (!workoutPlan) {
            return;
        }

        setSelectedExercise(workoutPlan.workouts[workoutIndex].exercises[index]);
        setShowExerciseForm(true);
    };

    const onRemoveWorkout = () => {
        if (!workoutPlan) {
            return;
        }

        workoutPlan.workouts
            .slice(0, workoutIndex)
            .concat(workoutPlan.workouts.slice(workoutIndex + 1));
    };

    const onAddWorkout = () => {
        if (!workoutPlan) {
            return;
        }

        let newId = 'A';
        if (workoutPlan.workouts.length) {
            newId = String.fromCharCode(
                workoutPlan.workouts[workoutIndex].id.charCodeAt(
                    workoutPlan.workouts[workoutIndex].id.length - 1
                ) + 1
            );
        }

        const newWorkout: Workout = { id: newId, exercises: [] };
        workoutPlan.workouts.push(newWorkout);
    };

    const onSavePress = async () => {
        const newWorkoutPlan: WorkoutPlan = createWorkoutPlan(
            workoutPlan?.workouts.length || 0,
            workoutPlan?.workouts || []
        );

        if (workoutPlan) {
            await workoutPlanStore.removeAsync({});
        }

        await workoutPlanStore.insertAsync(newWorkoutPlan);
        setWorkoutPlan(newWorkoutPlan);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {showExerciseForm && (
                <ExerciseForm
                    exercise={selectedExercise || undefined}
                    onSubmit={onExerciseFormSubmit}
                    onCancel={() => {
                        setShowExerciseForm(false);
                    }}
                />
            )}

            {!showExerciseForm && (
                <PagingControls
                    workoutIndex={workoutIndex}
                    workouts={workoutPlan?.workouts || []}
                    setWorkoutIndex={setWorkoutIndex}
                />
            )}

            {!showExerciseForm &&
                workoutPlan?.workouts[workoutIndex]?.exercises?.map((exercise, index) => (
                    <ExerciseCard
                        key={index}
                        exercise={exercise}
                        onEditPress={() => onEditExercise(index)}
                        onRemovePress={() => removeExercise(index, workoutPlan?.workouts[workoutIndex]?.exercises)}
                    />
                ))}

            {!showExerciseForm && (
                <ActionButton onPress={() => setShowExerciseForm(true)} text="Add Exercise" />
            )}

            {!showExerciseForm && workoutIndex === workoutPlan?.workouts.length
                        && <ActionButton onPress={onAddWorkout} text="Add Workout" />}

            {!showExerciseForm && workoutIndex > 0 && (
                <ActionButton onPress={onRemoveWorkout} text="Remove Workout" />
            )}

            {!showExerciseForm && (
                <View style={{ padding: 20 }}>
                    <ActionButton
                        contained
                        onPress={onSavePress}
                        style={{ marginTop: 10 }}
                        text="Save"
                    />

                    <ActionButton
                        onPress={() => navigation.reset({ routes: [{ name: 'BlankMenuScreen' }] })}
                        text="Home"
                    />
                </View>
            )}
        </ScrollView>
    );
}

const createStyles = () =>
    StyleSheet.create({
        container: {
            margin: 10,
            marginBottom: 35,
        },
        input: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            marginBottom: 10,
        },
    });
