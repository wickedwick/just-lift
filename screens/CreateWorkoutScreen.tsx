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
import { removeExercise, replaceExercise } from '../services/exercise';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { WorkoutPlanContext } from '../context/WorkoutPlanContext';

export default function CreateWorkoutScreen({
    navigation,
}: StackScreenProps<TabOneParamList, 'CreateWorkoutScreen'>): JSX.Element {
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [showExerciseForm, setShowExerciseForm] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [workoutIndex, setWorkoutIndex] = useState(0);
    const { workoutPlan, setWorkoutPlan } = useContext(WorkoutPlanContext);
    const workoutPlanStore: Datastore = createStore(DataStoreType.WorkoutPlan);
    const styles = createStyles();

    useEffect(() => {
        if (!workoutPlan) {
            const newWorkout: Workout = { id: 'A', exercises: [] };
            setWorkouts([newWorkout]);
        } else {
            setWorkouts(workoutPlan.workouts);
        }
    }, []);

    const onExerciseFormSubmit = (exercise: Exercise) => {
        if (selectedExercise) {
            replaceExercise(exercise, workoutIndex, workoutPlan);
            setSelectedExercise(null);
            setShowExerciseForm(false);
            return;
        }

        workouts[workoutIndex].exercises.push(exercise);
        setShowExerciseForm(false);
        setSnackbarMessage('Exercise saved successfully!');
        setVisible(true);
    };

    const onEditExercise = (index: number) => {
        if (!workoutPlan) {
            return;
        }

        setSelectedExercise(workouts[workoutIndex].exercises[index]);
        setShowExerciseForm(true);
    };

    const onRemoveWorkout = () => {
        if (!workoutPlan) {
            return;
        }

        workouts.pop();
        setWorkoutIndex(workoutIndex - 1);
        setSnackbarMessage('Workout removed successfully!');
        setVisible(true);
    };

    const onAddWorkout = () => {
        let newId = 'A';
        if (workouts.length) {
            newId = String.fromCharCode(
                workouts[workoutIndex].id.charCodeAt(
                    workouts[workoutIndex].id.length - 1
                ) + 1
            );
        }

        const newWorkout: Workout = { id: newId, exercises: [] };
        workouts.push(newWorkout);
        setWorkouts(workouts);
        setWorkoutIndex(workoutIndex + 1);
        setSnackbarMessage('Workout added successfully!');
        setVisible(true);
    };

    const onSavePress = async () => {
        const newWorkoutPlan: WorkoutPlan = createWorkoutPlan(
            workouts.length || 0,
            workouts || []
        );

        if (workoutPlan) {
            await workoutPlanStore.removeAsync({});
        }

        await workoutPlanStore.insertAsync(newWorkoutPlan);
        setWorkoutPlan(newWorkoutPlan);
        setSnackbarMessage('Workout plan saved successfully!');
        setVisible(true);
    };

    const isLastWorkout = (): boolean => {
        if (!workouts.length) return true;
        return !showExerciseForm && workoutIndex === workouts.length - 1;
    };

    const hasWorkouts = (): boolean => {
        if (!workouts.length) return false;

        return true;
    };

    const onRemoveExercise = (index: number): void => {
        const slicedExercises = removeExercise(index, workouts[workoutIndex]?.exercises);
        const newWorkout: Workout = {
            id: workouts[workoutIndex].id,
            exercises: slicedExercises,
        };

        workouts[workoutIndex] = newWorkout;

        setWorkouts(workouts);
        setSnackbarMessage('Exercise removed successfully!');
        setVisible(true);
    }

    const onDismissSnackBar = (): void => {
        setVisible(false);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Snackbar
                wrapperStyle={styles.snackbar}
                visible={visible}
                duration={Snackbar.DURATION_SHORT}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'x',
                onPress: () => {
                    // Do something
                },
                }}>
                {snackbarMessage}
            </Snackbar>
            
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
                    workouts={workouts || []}
                    setWorkoutIndex={setWorkoutIndex}
                />
            )}

            {!showExerciseForm &&
                workouts[workoutIndex]?.exercises?.map((exercise, index) => (
                    <ExerciseCard
                        key={index}
                        exercise={exercise}
                        onEditPress={() => onEditExercise(index)}
                        onRemovePress={() => onRemoveExercise(index)}
                    />
                ))}

            {!showExerciseForm && hasWorkouts() && (
                <ActionButton onPress={() => setShowExerciseForm(true)} text="Add Exercise" />
            )}

            {isLastWorkout() && <ActionButton onPress={onAddWorkout} text="Add Workout" />}

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
            height: '100%',
        },
        input: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            marginBottom: 10,
        },
        snackbar: {
            position: 'absolute',
            bottom: 0,
            left: 0,
        }
    });
