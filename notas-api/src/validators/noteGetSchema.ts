import * as z from "zod"

const NoteGetSchema = z.object({
    date: z.string().optional(),
    text: z.string().optional()
})

export default NoteGetSchema