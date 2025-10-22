import type { NoteGetQuery } from '../type/NoteGetQuery'
import { makeApiNoteRoute } from '../routes/constRoutes'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Note } from '../type/Note'

export const noteApi = createApi({
    reducerPath: 'noteApi',
    baseQuery: fetchBaseQuery({ baseUrl: makeApiNoteRoute() }),
    tagTypes: ['Notes'],
    endpoints: (builder) => ({
        getNoteById: builder.query<Note, string>({
            query: (id) => ({ 
                url: `/${id}` , 
                method: 'get',
            }) 
        }),
        getNotes: builder.query<Note[], NoteGetQuery | undefined>({ 
            query: (params) => ({ 
                url: '/' , 
                method: 'get',
                params: params
            }),
            providesTags: ['Notes']
        }),
        addNote: builder.mutation<Note, Partial<Note>>({
            query(body) {
                return {
                    url: `/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['Notes']
        }),
        updateNote: builder.mutation<Note, Partial<Note>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: ['Notes']

        }),
        deleteNote: builder.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Notes']
        }),
    }),
})

export const { 
    useGetNotesQuery,
    useLazyGetNotesQuery,
    useGetNoteByIdQuery,
    useLazyGetNoteByIdQuery,
    useAddNoteMutation,
    useUpdateNoteMutation, 
    useDeleteNoteMutation, 
} = noteApi
