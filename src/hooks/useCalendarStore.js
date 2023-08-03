import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEnent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEnent(calendarEvent));
  }

  const startSavingEvent = async (calendarEvent) => {
    // Todo: llegar al backend
    if (calendarEvent._id) {
      // Actualizar
      dispatch(onUpdateEvent({...calendarEvent}));
    } else {
      // Crear
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  }

  const startDeletingEvent = async () => {
    // Todo: llegar al backend
    dispatch(onDeleteEvent());
  }
  

  return {
    // Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    // Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  }
}
