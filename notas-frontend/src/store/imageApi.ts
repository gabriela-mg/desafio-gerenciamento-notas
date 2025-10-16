import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { makeApiNoteRoute } from "../routes/constRoutes";

type Image = {
    id: number | undefined,
    images: File[]
}

export const imageApi = createApi({
    reducerPath: 'imageApi',
    baseQuery: fetchBaseQuery({ baseUrl: makeApiNoteRoute() }),
    endpoints: (builder) => ({
        getImages: builder.query<File[], number>({ 
            query: (id) => ({ 
                url: `/${id}/image` , 
                method: 'get',
            }),
        }),
        addImage: builder.mutation<File[], Image>({
            query(data) {
                const { id, ...body } = data
                const formData = new FormData();
                body.images.map(element => {
                    formData.append(element.name, element)
                });
                return {
                    url: `/${id}/image`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                }
            },
        }),
        /*deleteImage: builder.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Notes']
        }),*/
    }),
})

export const { 
    useGetImagesQuery,
    useLazyGetImagesQuery,
    useAddImageMutation,
} = imageApi