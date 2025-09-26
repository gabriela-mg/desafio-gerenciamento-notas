import * as z from "zod"

const NotePutSchema = z.object({
    id: z.string(),
    title: z.string().min(1),
    description: z.string().min(1)
})

export default NotePutSchema
export type NotePutForm = z.infer<typeof NotePutSchema>

