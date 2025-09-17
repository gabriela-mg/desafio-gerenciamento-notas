import * as z from "zod"

const NotePutSchema = z.object({
    id: z.string(),
    title: z.string().optional(),
    description: z.string().optional()
})

export default NotePutSchema

