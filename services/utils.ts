export const getParsedDate = (strDate: Date): string => {
  const date: Date = new Date(strDate)
  const dd: number = date.getDate()
  const mm: number = date.getMonth() + 1
  let hh: number = date.getHours()
  
  if (hh >= 12) {
    if (hh > 12) {
      hh -= 12
    }
  }
  
  const amPm: 'AM' | 'PM' = derivedAmPm(hh)
  const min: number = date.getMinutes()
  const yyyy: number = date.getFullYear()
  
  let dateStr: string =  `${mm}/${dd}/${yyyy} ${hh}:${min < 10 ? '0' + min : min} ${amPm}`
  return dateStr
}

export const getNumberOrDefault = (value: string): number => {
  const numberValue: number = parseInt(value)
  if (isNaN(numberValue)) {
    return 0
  }

  return numberValue
}

export const derivedAmPm = (hh: number): 'AM' | 'PM' => {
  if (hh >= 12) {
    return 'PM'
  }

  return 'AM'
}

export const createGroups = (arr: any[], perGroup: number): any[] => {
  const numGroups = Math.ceil(arr.length / perGroup)

  return new Array(numGroups)
    .fill('')
    .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup))
}