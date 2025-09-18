import { DataSource, SelectQueryBuilder } from "typeorm"

type Note = {
    title: string,
    description: string,
    id: number,
    date: Date
}

export interface NoteRepository {
    findNotes(): Promise<Note[]>

    findNoteById(id: number): Promise<Note> 

    createNote(note: Note) : Promise<Note>

    updateNote(id: number, title: string, description: string): Promise<boolean>

    deleteNote(id: number): Promise<boolean>

    findNotesByFilters(text?: string, startDate?: string, endDate?: string): Promise<Note[]>
}