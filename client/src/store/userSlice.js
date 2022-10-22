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
    updateLeaveData: (state, action) => {
      state.leaveData = action.payload;
    },
  },
});

export const { updateUserInfo, logOnOrOff, updateLeaveData } =
  userSlice.actions;

export default userSlice.reducer;
