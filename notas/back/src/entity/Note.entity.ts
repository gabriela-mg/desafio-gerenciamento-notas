import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import { Image } from "./Image.entity";

@Entity()
export class Note {
    @PrimaryGeneratedColumn({type:"int"})
    id: number;

    @Column({ type:"varchar", length:"40", nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Image, (image) => image.note)
    images: Image[]

}