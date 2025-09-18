import * as z from "zod"

const NoteGetSchema = z.object({
    startDate: z.string().nullish(),
    endDate : z.string().nullish(),
    text: z.string().nullish()
})

export default NoteGetSchema