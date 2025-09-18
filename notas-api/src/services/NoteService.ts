import { ParsedQs } from "qs"
import { Note } from "../database/entities/Note.entity"
import { NoteRepository } from "../repositories/NoteRepository"

export class NoteService {

    constructor(private noteRepository: NoteRepository) {
        this.noteRepository = noteRepository
    }

    public async selectNotes(text?: string, startDate?: string, endDate?: string) {
        if(text || startDate || endDate) {
            const notes = this.noteRepository.findNotesByFilters(text, startDate, endDate)
            return notes
        } else {
            const notes = this.noteRepository.findNotes()
            return notes
        }
    }

    public async selectNoteByID(id: string) {
        const idNumber = Number(id)
        const note = await this.noteRepository.findNoteById(idNumber)
        return note
    }

    public async addNote(title: string, description: string) {
        const note = new Note()    
        note.title = title
        note.description = description
        await this.noteRepository.createNote(note)
    }

    public async updateNote(id: string, title: string, description: string) {
        const idNumber = Number(id)

        const answer = await this.noteRepository.updateNote(idNumber, title, description)

        return answer
    }

    public async deleteNote(id: string) {
        const idNumber = Number(id)
        
        const answer = await this.noteRepository.deleteNote(idNumber)

        return answer
    }

}