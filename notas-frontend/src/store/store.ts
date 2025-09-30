import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './noteSlice'

export const store = configureStore({
  reducer: {
    notes: notesReducer
  }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>