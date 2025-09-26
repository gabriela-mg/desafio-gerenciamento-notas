import * as z from "zod"

const NoteGetSchema = z.object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    text: z.string().min(1).optional()
})

export default NoteGetSchema