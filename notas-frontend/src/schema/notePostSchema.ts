import * as z from "zod"

const NotePostSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1)
})

export default NotePostSchema
export type NotePostForm = z.infer<typeof NotePostSchema>

