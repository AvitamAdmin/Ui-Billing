import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slice';

const store = configureStore({
  reducer: {
    billing: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
