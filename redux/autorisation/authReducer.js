import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: 'null',
  nickName: 'null',
  photoURL: 'null',
  stateChange: 'false',
};

export const authSlice = createSlice({
  name: 'autorisation',
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
      photoURL: payload.photoURL,
    }),
    authStateChange: (state, { payload }) => ({ ...state, stateChange: payload.stateChange }),
    authSignOut: () => state,
  },
});
