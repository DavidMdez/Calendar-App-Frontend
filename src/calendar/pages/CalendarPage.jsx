import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { NavBar } from "../components";
import { getMessagesES, localizer } from '../../helpers';

const events = [{
  title: 'My event',
  notes: 'Notes',
  start: new Date(),
  end: addHours(new Date(), 2)
}]

const eventStyleGetter = (event, start, end, isSelected) => {
  console.log({event, start, end, isSelected})

  const style = {
    backgroundColor: '#367CF7',
    borderRadius: '0px',
    opacity: 0.8,
    color: 'white',
  }

  return {
    style
  }
}

export const CalendarPage = () => {
  return (
    <>
      <NavBar />

      <Calendar
        messages={getMessagesES()}
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 56px)' }}
        eventPropGetter={eventStyleGetter}
      />
    </>
  )
}
