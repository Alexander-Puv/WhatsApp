const weekDays = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
]

const getMessageTime = (date: Date) => {
  return date.getDate() === new Date().getDate()
    ? `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
    : date.getDate() === new Date().getDate() - 1 ? 'Вчера'
    : new Date().getDate() - date.getDate() < 7
    ? weekDays[date.getDay()]
    : `${date.getDate()}.${
        date.getMonth() < 10 ?
          `0${date.getMonth()}`
          : date.getMonth()
      }.${date.getFullYear()}`
}
export default getMessageTime

export const getDate = (date: Date) => {
  return `${date.getDate()}.${
      date.getMonth() < 10 ?
        `0${date.getMonth()}`
        : date.getMonth()
    }.${date.getFullYear()}`
}