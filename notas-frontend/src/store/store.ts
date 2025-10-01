import { configureStore } from '@reduxjs/toolkit'
import { noteApi } from './noteSlice'

export const store = configureStore({
  reducer: {
    [noteApi.reducerPath]: noteApi.reducer,
  },
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>