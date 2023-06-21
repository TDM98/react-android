import { Calendar } from 'react-native-big-calendar'

const events = [
  {
    title: 'Meeting',
    start: new Date(2023, 6, 21, 10, 0),
    end: new Date(2023, 6, 21, 10, 30),
  },
  {
    title: 'Coffee break',
    start: new Date(2023, 6, 21, 15, 45),
    end: new Date(2023, 6, 21, 16, 30),
  },
]

function MonthCalendar(naviagtion,route) {
  return <Calendar events={events} height={1000} />
}
export default MonthCalendar;