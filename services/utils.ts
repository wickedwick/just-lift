export const getParsedDate = (strDate: Date): string => {
  const strSplitDate: string[] = String(strDate).split(' ')
  const date: Date = new Date(strSplitDate[0])
  
  const dd: number = date.getDate()
  const mm: number = date.getMonth() + 1
  let hh: number = date.getHours()
  
  if (hh >= 12) {
    if (hh > 12) {
      hh -= 12
    }
  }
  
  let amPm: 'AM' | 'PM' = derivedAmPm(hh)
  const min: number = date.getMinutes()
  const yyyy: number = date.getFullYear()
  
  let dateStr: string =  `${mm}/${dd}/${yyyy} ${hh}:${min} ${amPm}`
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
