import * as z from "zod"

const NoteGetSchema = z.object({
    date: z.string().nullish(),
    text: z.string().nullish()
})

export default NoteGetSchema