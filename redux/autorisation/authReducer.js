import { createSlice } from '@reduxjs/toolkit';

const state = { userId: 'null', nickName: 'null', stateChange: 'true' };

export const authSlice = createSlice({
  name: 'autorisation',
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
    }),
    authStateChange: (state, { payload }) => ({ ...state, stateChange: payload.stateChange }),
    authSignOut: (state, { payload }) => ({ ...state, stateChange: payload.stateChange }),
  },
});

// console.log(updateUserProfile());
// console.log(authSlice);
