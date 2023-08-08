import { createSlice } from '@reduxjs/toolkit'
// import { addHours } from 'date-fns';


// const tempEvents = {
//   _id: new Date().getTime(),
//   title: 'My event',
//   notes: 'Notes',
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   user: {
//     _id: '123',
//     name: 'Fernando',
//   }
// }

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEnent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map(
        event => event.id === payload.id ? payload : event
      );
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          event => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      // state.events = payload;
      payload.forEach(event => {
        const exists = state.events.some(dbEvent => dbEvent.id === event.id);

        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
})

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEnent,
  onUpdateEvent,
} = calendarSlice.actions;