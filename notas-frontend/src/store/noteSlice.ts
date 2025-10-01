import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Note } from '../type/Note'
import { makeApiNoteRoute } from '../routes/constRoutes'
import { createSlice } from '@reduxjs/toolkit'

type NoteGetQuery = {
    text: string | undefined, 
    startDate: string | undefined, 
    endDate: string | undefined
}

export const noteApi = createApi({
    reducerPath: 'noteApi',
    baseQuery: fetchBaseQuery({ baseUrl: makeApiNoteRoute() }),
    endpoints: (builder) => ({
        getNotebyId: builder.query<Note, string | undefined>({
            query: (id) => `/${id}`,
        }),
        getNote: builder.query({ query: () => ({ url: '/', method: 'get' }) }),
        getNotesByFilter: builder.query<Note, NoteGetQuery>({
            query: (params) => ({
                url: '/posts',
                params: params, 
            }),
        }),
    }),
})

const initialState = {
    value: []
}

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(noteApi.endpoints.getNote.matchFulfilled, (state, action) => {
      state.value = action.payload;
    }),
    builder.addMatcher(noteApi.endpoints.getNotesByFilter.matchFulfilled, (state, action) => {
      state.value = action.payload;
    })
  }
})

export const { useGetNotebyIdQuery, useGetNoteQuery, useGetNotesByFilterQuery } = noteApi