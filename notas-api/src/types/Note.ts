import { Image } from "./Image"

export type Note = {
    title: string,
    description: string,
    id: number,
    date: Date,
    images: Image[]
}
