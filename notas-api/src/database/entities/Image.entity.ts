import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Note } from "./Note.entity.ts"

@Entity("image")
export class Image {

    @PrimaryGeneratedColumn({type:"int"})
    id: number

    @Column({type:"varchar", length:"50", nullable:false})
    address: string

    @ManyToOne(() => Note, (note) => note.images)
    note: Note

}
