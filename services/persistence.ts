import AsyncStorage from '@react-native-async-storage/async-storage'
import { WorkoutPlan } from '../types/workout'

export async function getItemAsync<T>(key: string): Promise<T> {
  const value = await AsyncStorage.getItem(key)
  return JSON.parse(value || 'null') as T
}

export async function setItemAsync<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value))
}

export async function removeItemAsync(key: string): Promise<void> {
  await AsyncStorage.removeItem(key)
}

export function getItem(key: string, setWorkoutPlan: (workoutPlan: WorkoutPlan) => void): void {
  AsyncStorage.getItem(key).then(value => {
    const workoutPlan = JSON.parse(value || 'null') as WorkoutPlan
    setWorkoutPlan(workoutPlan)
  })
}
