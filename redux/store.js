import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './autorisation/authReducer';

const rootReduser = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReduser,
});
