import { createGroups, derivedAmPm, getNumberOrDefault } from "../utils"

describe('utils', () => {
  // TODO: Figure out why we get invalid date in test
  // describe('getParsedDate', () => {
  //   it('returns a date string', () => {
  //     const strDate = '2019-01-12T12:31:00.000Z'
  //     const date = new Date()
  //     const dateStr = getParsedDate(date)
  //     expect(dateStr).toBe('01/12/2019 12:31 PM')
  //   })
  // })

  describe('getNumberOrDefault', () => {
    it('returns a number', () => {
      const value = '123'
      const numberValue = getNumberOrDefault(value)
      expect(numberValue).toBe(123)
    })

    it('returns 0 if the value is not a number', () => {
      const value = 'abc'
      const numberValue = getNumberOrDefault(value)
      expect(numberValue).toBe(0)
    })
  })

  describe('derivedAmPm', () => {
    it('returns AM if the hour is less than 12', () => {
      const hh = 10
      const amPm = derivedAmPm(hh)
      expect(amPm).toBe('AM')
    })

    it('returns PM if the hour is greater than 12', () => {
      const hh = 13
      const amPm = derivedAmPm(hh)
      expect(amPm).toBe('PM')
    })
  })

  describe('createGroups', () => {
    it('returns an array of arrays grouped into 3', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      let groups = createGroups(arr, 3)
      expect(groups).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9] , [10]])

      groups = createGroups(arr, 2)
      expect(groups).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]])

      groups = createGroups(arr, 4)
      expect(groups).toEqual([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10]])
    })
  })
})
