import { configureStore } from '@reduxjs/toolkit';

import { sampleSlice } from './sample';

export const store = configureStore({
  reducer: {
    [sampleSlice.name]: sampleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
