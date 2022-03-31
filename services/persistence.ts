import AsyncStorage from '@react-native-async-storage/async-storage'

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
