import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../routes/constRoutes";

type Image = {
    id: number | undefined,
    images: File[]
}

export const imageApi = createApi({
    reducerPath: 'imageApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({
        getImages: builder.query<string[], string>({ 
            query: (id) => ({ 
                url: `/note/${id}/image` , 
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
                    url: `/note/${id}/image`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                }
            },
        }),
        getOneImage: builder.query<File, string>({ 
            query: (id) => ({ 
                url: `/${id}` , 
                method: 'get',
                responseHandler: async (response) =>
                    URL.createObjectURL(await response.blob()),
                }),
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
    useLazyGetOneImageQuery
} = imageApi