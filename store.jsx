import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Ensure correct import

const store = configureStore({
  reducer: {
    users: userReducer, // Ensure key matches expected slice name
  },
});

export default store;
