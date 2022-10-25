import { createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    isLogged: false,
    leaveData: [],
  },
  reducers: {
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logOnOrOff: (state, action) => {
      if (action.payload.status) {
        state.isLogged = true;
        state.userInfo = action.payload.userInfo;
      } else {
        state.isLogged = false;
        state.userInfo = {};
        state.leaveData = [];
      }
    },
    initiateLeaveData: (state, action) => {
      state.leaveData = action.payload;
    },
    updateLeaveData: (state, action) => {
      state.leaveData.push(action.payload);
    },
    editLeaveData: (state, action) => {
      const { id, data } = action.payload;
      const filteredArr = state.leaveData.map((i) => {
        if (i.id === id) {
          return data;
        } else {
          return i;
        }
      });
      state.leaveData = filteredArr;
    },
  },
});

export const {
  updateUserInfo,
  logOnOrOff,
  updateLeaveData,
  initiateLeaveData,
  editLeaveData,
} = userSlice.actions;

export default userSlice.reducer;
