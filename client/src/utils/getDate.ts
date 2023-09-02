const weekDays = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
]

export const getMessageTime = (date: Date) => {
  const isToday = (date.getDate() === new Date().getDate())
    && (date.getMonth() === new Date().getMonth())
    && (date.getFullYear() === new Date().getFullYear())
  
  return isToday
    ? `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
    : date.getDate() === new Date().getDate() - 1
      ? 'Вчера'
      : new Date().getDate() - date.getDate() < 7
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