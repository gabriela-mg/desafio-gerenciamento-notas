import { DataSource, SelectQueryBuilder } from "typeorm"

type Note = {
    title: string,
    description: string,
    id: number,
    date: Date
}

export interface NoteRepository {
    findNotes(text?: string, startDate?: Date, endDate?: Date): Promise<Note[]>

    findNoteById(id: number): Promise<Note> 

    createNote(note: Note) : Promise<Note>

    updateNote(id: number, title: string, description: string): Promise<boolean>

    deleteNote(id: number): Promise<boolean>
}