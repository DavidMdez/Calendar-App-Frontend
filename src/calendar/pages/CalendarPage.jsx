import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "../components";
import { getMessagesES, localizer } from '../../helpers';
import { useEffect, useState } from 'react';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected) => {
    
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent ? '#0062cc' : '#465660',
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
    setActiveEvent(e);
  }
  
  const onView = (e) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])

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
      <FabAddNew />
      <FabDelete />
    </>
  )
}
