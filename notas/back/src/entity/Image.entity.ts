import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { Note } from "./Note.entity";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: false })
    address: string;

    @ManyToOne(() => Note, (note) => note.images)
    note: Note
}