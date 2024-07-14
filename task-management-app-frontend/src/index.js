import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../src/features/api/apiSlice';
import authReducer from '../src/features/auth/authSlice';
import tasksReducer from '../src/features/tasks/tasksSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
