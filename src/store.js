// src/pages/components/store.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import usersReducer from './slices/usersSlice';

export default configureStore({
  reducer: {
    theme: themeReducer,
    users: usersReducer,
  },
});