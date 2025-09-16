import * as z from "zod"

const Note = z.object({
    id: z.coerce.number(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    date: z.string().nullable(),
    text: z.string().nullable()
})

export default Note