export const getParsedDate = (strDate: Date) => {
  var strSplitDate = String(strDate).split(' ')
  var date = new Date(strSplitDate[0])
  let amPm = 'AM'
  var dd = date.getDate()
  var mm = date.getMonth() + 1
  var hh = date.getHours()
  
  if (hh > 12) {
    hh -= 12
    amPm = 'PM'
  }

  var min = date.getMinutes()
  var yyyy = date.getFullYear()
  
  let dateStr =  `${mm}/${dd}/${yyyy} ${hh}:${min} ${amPm}`
  return dateStr
}
