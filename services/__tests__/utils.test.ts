import { getNumberOrDefault, derivedAmPm } from "../utils"

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
})
