import type { Note } from '../type/Note'
import { createSlice } from '@reduxjs/toolkit'
import { noteApi } from './noteApi'

type state = {
    notes: Note[],
    note: Note | undefined
}

const initialState: state = {
    notes: [],
    note: undefined
}

export const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addMatcher(noteApi.endpoints.getNotes.matchFulfilled, (state, action) => {
        state.notes = action.payload
    }),
    builder.addMatcher(noteApi.endpoints.getNoteById.matchFulfilled, (state, action) => {
        state.note = action.payload
        console.log("get ", action.payload)
    }),
    builder.addMatcher(noteApi.endpoints.updateNote.matchFulfilled, (state, action) => {
        state.note = action.payload
    })
  }
})

export default noteSlice.reducer

