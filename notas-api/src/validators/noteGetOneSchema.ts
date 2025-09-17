import * as z from "zod"

const NoteGetOneSchema = z.object({
    id: z.string().nullable()
})

export default NoteGetOneSchema

