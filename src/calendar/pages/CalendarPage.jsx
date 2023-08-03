import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarEvent, CalendarModal, NavBar } from "../components";
import { getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';
import { useUiStore } from '../../hooks';

const events = [{
  title: 'My event',
  notes: 'Notes',
  start: new Date(),
  end: addHours(new Date(), 2),
  user: 'David Mendez'
}]

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#0062cc',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }
  
    return {
      style
    }
  }

  const onDoubleClick = (e) => {
    openDateModal();
  }
  
  const onSelect = (e) => {
    console.log({ onSelect: e })
  }
  
  const onView = (e) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  }

  return (
    <>
      <NavBar />

      <Calendar
        messages={getMessagesES()}
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 56px)' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onView}
      />

      <CalendarModal />
    </>
  )
}
