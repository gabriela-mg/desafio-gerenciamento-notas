import { Note } from "../types/Note"

export interface NoteRepository {
    findNotes(text?: string, startDate?: Date, endDate?: Date): Promise<Note[]>

    findNoteById(id: number): Promise<Note> 

    createNote(title: string, description: string) : Promise<Note>

    updateNote(id: number, title: string, description: string): Promise<Note>

    deleteNote(id: number): Promise<boolean>
}