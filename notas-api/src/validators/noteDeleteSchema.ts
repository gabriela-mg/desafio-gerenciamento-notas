import * as z from "zod"

const NoteDeleteSchema = z.object({
    id: z.string()
})

export default NoteDeleteSchema

