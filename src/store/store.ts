import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from './api/blogApi';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    auth: authReducer,
    post: postReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;