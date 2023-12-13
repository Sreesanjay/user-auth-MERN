import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/userAuthSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
  })