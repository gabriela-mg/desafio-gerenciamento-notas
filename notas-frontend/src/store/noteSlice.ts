// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Note } from '../type/Note'
import { makeApiNoteRoute } from '../routes/constRoutes'
import type { NoteGetForm } from '../schema/noteGetSchema'

// Define a service using a base URL and expected endpoints
export const noteApi = createApi({
  reducerPath: 'noteApi',
  baseQuery: fetchBaseQuery({ baseUrl: makeApiNoteRoute() }),
  endpoints: (builder) => ({
    getNotebyId: builder.query<Note, string>({
      query: (id) => `/${id}`,
    }),
    getNotesByFilter: builder.query<Note, NoteGetForm>({
      query: (arg) => {
        return {
          params: arg
        }
      }
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNotebyIdQuery } = noteApi