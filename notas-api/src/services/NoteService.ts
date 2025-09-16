import { ParsedQs } from "qs"
import { Note } from "../database/entities/Note.entity"
import { NoteRepository } from "../repositories/NoteRepository"

export class NoteService {

    constructor(private noteRepository: NoteRepository) {
        this.noteRepository = noteRepository
    }

    public async selectNotes(text?: string | any, date?: string | any) {
        const notes = (date!==undefined || text!== undefined) ? await this.selectNotesByFilters(text, date) : await this.noteRepository.findNotes()
        return notes
    }

    public async selectNoteByID(id: string) {
        const idNumber = Number(id)
        const note = await this.noteRepository.findNoteById(idNumber)
        return note
    }

    public async createNote(title: string, description: string) {
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

    public async selectNotesByFilters(text?: string, date?: string) {
        const startOfDay = new Date(date)
        const endOfDay = new Date(date)

        if(date !== undefined && date.trim().length > 0) {
            startOfDay.setUTCHours(0, 0, 0, 0)
            endOfDay.setUTCHours(23, 59, 59, 999)

            if(text !==undefined && text.trim().length === 0) {
                text = ""
            } 

            const answer = await this.noteRepository.findNotesByFilters(text, startOfDay, endOfDay)
                    
            return answer
        } else {
            if(text !==undefined && text.trim().length === 0) {
                text = ""
            } 
            const answer = await this.noteRepository.findNotesByFilters(text)
                    
            return answer
        }        
    }
}