import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const {
  updateUserInfo,
  logOnOrOff,
  updateLeaveData,
  initiateLeaveData,
} = userSlice.actions;

export default userSlice.reducer;
