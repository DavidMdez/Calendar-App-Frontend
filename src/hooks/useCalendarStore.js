import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEnent } from "../store";


export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEnent(calendarEvent));
  }

  return {
    // Propiedades
    events,
    activeEvent,
    // Métodos
    setActiveEvent,
  }
}