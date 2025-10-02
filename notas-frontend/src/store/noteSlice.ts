import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Note } from '../type/Note'
import { makeApiNoteRoute } from '../routes/constRoutes'
import { createSlice } from '@reduxjs/toolkit'
import type { NoteGetQuery } from '../type/NoteGetQuery'

export const noteApi = createApi({
    reducerPath: 'noteApi',
    baseQuery: fetchBaseQuery({ baseUrl: makeApiNoteRoute() }),
    endpoints: (builder) => ({
        getNotebyId: builder.query<Note, string | undefined>({
            query: (id) => `/${id}`,
        }),
        getNote: builder.query({ query: () => ({ url: '/', method: 'get' }) }),
        getNotesByFilter: builder.query<Note[], NoteGetQuery>({
            query: (params) => ({
                url: '/',
                params: params, 
            }),
        }),
    }),
})

type state = {
    notes: Note[]
}

const initialState: state = {
    notes: []
}

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(noteApi.endpoints.getNote.matchFulfilled, (state, action) => {
      state.notes = action.payload;
    }),
    builder.addMatcher(noteApi.endpoints.getNotesByFilter.matchFulfilled, (state, action) => {
      state.notes = action.payload;
    })
  }
})

export const { useLazyGetNoteQuery, useLazyGetNotebyIdQuery, useLazyGetNotesByFilterQuery, useGetNoteQuery } = noteApi
export default noteSlice.reducer

