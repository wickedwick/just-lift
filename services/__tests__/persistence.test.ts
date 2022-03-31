import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItemAsync, removeItemAsync, setItemAsync } from '../persistence';

describe('Persistence', () => {
  describe('getItemAsync', () => {
    it('calls AsyncStorage getItem', async () => {
      const spy = jest.spyOn(AsyncStorage, 'getItem')
      const key = 'key'
      await getItemAsync(key)
      expect(spy).toHaveBeenCalledWith(key)
    })
  })

  describe('setItemAsync', () => {
    it('calls AsyncStorage setItem', async () => {
      const spy = jest.spyOn(AsyncStorage, 'setItem')
      const key = 'key'
      const value = 'value'
      await setItemAsync(key, value)
      expect(spy).toHaveBeenCalledWith(key, "\"value\"")
    })
  })

  describe('removeItem', () => {
    it('calls AsyncStorage removeItem', async () => {
      const spy = jest.spyOn(AsyncStorage, 'removeItem')
      const key = 'key'
      await removeItemAsync(key)
      expect(spy).toHaveBeenCalledWith(key)
    })
  })
})