import * as z from "zod"

const NoteGetSchema = z.object({
    text: z.string(),
    endDate: z.string(), 
    startDate: z.string()
})

export default NoteGetSchema
export type NoteGetForm = z.infer<typeof NoteGetSchema>
