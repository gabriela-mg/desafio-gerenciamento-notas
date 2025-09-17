import * as z from "zod"

const NotePostSchema = z.object({
    title: z.string().nullable(),
    description: z.string().nullable()
})

export default NotePostSchema

