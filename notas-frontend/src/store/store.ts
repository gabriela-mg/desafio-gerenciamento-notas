import { configureStore } from '@reduxjs/toolkit'
import { noteApi } from './noteSlice'
import noteReducer from './noteSlice'

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    [noteApi.reducerPath]: noteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteApi.middleware),
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>