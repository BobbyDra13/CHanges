/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const zoneSlice = createSlice({
  name: 'zone',
  initialState: [],
  reducers: {
    addZone(state, action) {
      state.push(action.payload);
      console.log('Zone added to store:', action.payload);
    },
    removeZone(state, action) {}
  }
});

export default zoneSlice.reducer;
export const { addZone, removeZone } = zoneSlice.actions;
