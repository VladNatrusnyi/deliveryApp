import { configureStore } from '@reduxjs/toolkit'
import systemReducer from './systemSlice'
import {dbApi} from "./queries/dbApi";

export const store = configureStore({
  reducer: {
    system: systemReducer,
    [dbApi.reducerPath]: dbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(dbApi.middleware,)
})
