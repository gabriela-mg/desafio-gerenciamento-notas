import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import { Image } from "./Image.entity.ts"

@Entity()
export class Note {

    @PrimaryGeneratedColumn({type:"int"})
    id: number

    @Column({type:"varchar", length:"40"})
    title: string

    @Column({type:"text"})
    description: string

    @CreateDateColumn()
    date: Date

    @OneToMany(() => Image, (image) => image.note)
    images: Image[]

}
