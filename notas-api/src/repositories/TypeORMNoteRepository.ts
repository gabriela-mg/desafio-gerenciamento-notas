import { NoteEntity } from "../database/entities/Note.entity.ts";
import AppDataSource from "../database/data-source.ts";
import { NoteRepository } from "./NoteRepository.ts";
import { Between, Brackets, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";

export class TypeORMNoteRepository implements NoteRepository {

    private noteRepository = AppDataSource.getRepository(NoteEntity)

    public async findNotes(text?: string, startDate?: Date, endDate?: Date): Promise<NoteEntity[]> {
        const MAX_DATE = "9999-12-31"
        const MIN_DATE = "1000-01-01"

        const parsedStartDate = startDate ? new Date(startDate.setUTCHours(0, 0, 0, 0)) :  new Date(MIN_DATE)
        const parsedEndDate = endDate ? new Date(endDate.setUTCHours(23, 59, 59, 999)) :  new Date(MAX_DATE)
        
        const date = Between(parsedStartDate, parsedEndDate)
    
        const where = (
            text ? [
                { date, title: Like("%"+ text +"%") },
                { date, description: Like("%"+ text +"%") },
            ] : { date }
        )
        const notes = await this.noteRepository.find({
            where,
            order: {
                date: "DESC"
            }
        })

        return notes
    }

    public async findNoteById(id: number): Promise<NoteEntity> {
        const note = await this.noteRepository.findOne({
            where: {
                id: id
            }
        })
        
        return note
    }

    public async createNote(title: string, description: string) {
        const newnote = await this.noteRepository.save({title, description})
        return newnote
    }

    public async updateNote(id: number, title: string, description: string): Promise<NoteEntity> {
        const updateResult = await this.noteRepository.save({id: id, title: title, description: description})
        
        return updateResult
    }

    public async deleteNote(id: number) {
        const deleteResult = await this.noteRepository.delete(id)

        if(deleteResult.affected === null) {
            return false
        } else {
            return true
        }
    }
} 