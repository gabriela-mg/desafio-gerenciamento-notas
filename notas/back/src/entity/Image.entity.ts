import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { Note } from "./Note.entity";

@Entity()
export class Image {
    @PrimaryGeneratedColumn({type: "int"})
    id: number;

    @Column({ type: "varchar", length: "150", nullable: false })
    address: string;

    @ManyToOne(() => Note, (note) => note.images)
    note: Note
}