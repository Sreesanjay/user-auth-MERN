import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/userAuthSlice'
import searchReducer from '../features/manager/serchSlice'
import managerReducer from "../features/manager/userManagementSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        manager : managerReducer,
        search :searchReducer
    },
  })