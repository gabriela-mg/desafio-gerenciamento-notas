import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Note } from '../type/Note'
import { makeApiNoteRoute } from '../routes/constRoutes'
import type { NoteGetForm } from '../schema/noteGetSchema'

export const noteApi = createApi({
    reducerPath: 'noteApi',
    baseQuery: fetchBaseQuery({ baseUrl: makeApiNoteRoute() }),
    endpoints: (builder) => ({
        getNotebyId: builder.query<Note, string>({
            query: (id) => `/${id}`,
        }),
        getNote: builder.query({ query: () => ({ url: '/', method: 'get' }) }),
        getNotesByFilter: builder.query<Note, NoteGetForm>({
            query: (params) => ({
                url: '/posts',
                params: params, 
            }),
        }),
    }),
})

export const { useGetNotebyIdQuery, useGetNoteQuery, useGetNotesByFilterQuery } = noteApi