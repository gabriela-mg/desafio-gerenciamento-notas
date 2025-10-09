import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import { ImageEntity } from "./Image.entity.ts"

@Entity("note")
export class NoteEntity {

    @PrimaryGeneratedColumn({type:"int"})
    id: number

    @Column({type:"varchar", length:"40"})
    title: string

    @Column({type:"text"})
    description: string

    @CreateDateColumn()
    date: Date

    @OneToMany(() => ImageEntity, (image) => image.note)
    images: ImageEntity[]

}
