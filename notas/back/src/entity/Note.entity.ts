import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import { Image } from "./Image.entity";

@Entity()
export class Note {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Image, (image) => image.note)
    images: Image[]

}