import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'autorisation',
  initialState: {
    userId: 'null',
    nickName: 'null',
    stateChange: 'null',
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
    }),
    authStateChange: (state, { payload }) => ({ ...state, stateChange: payload.stateChange }),
  },
});

// console.log(updateUserProfile());
console.log(authSlice);
