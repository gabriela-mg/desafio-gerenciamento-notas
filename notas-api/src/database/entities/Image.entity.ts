import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { NoteEntity } from "./Note.entity.ts"

@Entity("image")
export class ImageEntity {

    @PrimaryGeneratedColumn({type:"int"})
    id: number

    @Column({type:"varchar", length:"50", nullable:false})
    address: string

    @ManyToOne(() => NoteEntity, (note) => note.images)
    note: NoteEntity

}
