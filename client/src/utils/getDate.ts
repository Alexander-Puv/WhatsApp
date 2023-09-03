const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export const getMessageTime = (date: Date) => {
  return `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
}

export const getSidebarMessageTime = (date: Date) => {
  const sameMonth = (date.getMonth() === new Date().getMonth())
    && (date.getFullYear() === new Date().getFullYear())

  const isToday = (date.getDate() === new Date().getDate()) && sameMonth
  const isYesterday = (date.getDate() === new Date().getDate() - 1) && sameMonth
  const isThisWeek = (new Date().getDate() - date.getDate() < 7) && sameMonth
  
  return isToday
    ? `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
    : isYesterday
      ? 'Yesterday'
      : isThisWeek
        ? weekDays[date.getDay()]
        : getDate(date)
}

export const getDate = (date: Date) => {
  const month = date.getMonth() + 1
  return `${date.getDate()}.${
    month < 10
      ? `0${month}`
      : month
  }.${date.getFullYear()}`
}