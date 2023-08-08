import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEnent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDate } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEnent(calendarEvent));
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // Actualizar
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
    } catch (error) {
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
      console.log(error);
    }

    // Crear
    try {
      const { data } = await calendarApi.post('./events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', 'Error en el servidor', 'error');
    }

  }

  const startDeletingEvent = async () => {
    try {      
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());

    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('./events');
      const events = convertEventsToDate(data.events);

      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log('Error al cargar los eventos');
      console.log(error);
    }
  }

  return {
    // Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    // Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}
