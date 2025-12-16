import { configureStore } from '@reduxjs/toolkit';

import { sampleSlice } from './sample/sample';

export const store = configureStore({
  reducer: {
    [sampleSlice.name]: sampleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
