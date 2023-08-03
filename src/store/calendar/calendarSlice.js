import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';


const tempEvents = {
  _id: new Date().getTime(),
  title: 'My event',
  notes: 'Notes',
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    _id: '123',
    name: 'Fernando',
  }
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [tempEvents],
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
        event => event._id === payload._id ? payload : event
      );
    }
  },
})

export const { onSetActiveEnent, onAddNewEvent, onUpdateEvent } = calendarSlice.actions;