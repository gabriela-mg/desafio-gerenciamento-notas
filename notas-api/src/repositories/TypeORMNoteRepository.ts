import { Note } from "../database/entities/Note.entity.ts";
import AppDataSource from "../database/data-source.ts";
import { NoteRepository } from "./NoteRepository.ts";
import { Between, Brackets, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";
import { start } from "repl";

export class TypeORMNoteRepository implements NoteRepository {

    private noteRepository = AppDataSource.getRepository(Note)

    public async findNotes(): Promise<Note[]> {
        const notes = await this.noteRepository.find({
            order: {
                date: "DESC"
            }
        })
        return notes
    }

    public async findNoteById(id: number): Promise<Note> {
        const note = await this.noteRepository.findOne({
            where: {
                id: id
            }
        })

        return note
    }

    public async createNote(note: Note) {
        const newnote = await this.noteRepository.save(note)
        return newnote
    }

    public async updateNote(id: number, title: string, description: string) {
        const updateResult = await this.noteRepository.update(id, {title: title, description: description})
        
        if(updateResult.affected === null) {
            return false
        } else {
            return true
        }
    }

    public async deleteNote(id: number) {
        const deleteResult = await this.noteRepository.delete(id)

        if(deleteResult.affected === null) {
            return false
        } else {
            return true
        }
    }

    public async findNotesByFilters(text?: string, firstDate?: string, lastDate?: string) {
        if(text === undefined || text.trim().length === 0) {
            text = ""
        } 

        const startDate = (firstDate) ? new Date(firstDate) : null
        const endDate = (lastDate) ? new Date(lastDate) : null

        if(startDate && endDate) {            
            const notes = this.findNotesbyDateInterval(text, startDate, endDate)
            return notes
        } else if(startDate) {
            const notes = this.findNotesbyStartDate(text, startDate)
            return notes
        } else if(endDate) {
            const notes = this.findNotesbyEndDate(text, endDate)
            return notes
        } else {
            const notes = this.findNotesbyText(text)
            return notes
        }
       
    }

    public async findNotesbyText(text: string) {
        const notes = await this.noteRepository.find({
            where: [
                { title: Like("%"+ text +"%") },
                { description: Like("%"+ text +"%") },
            ],
            order: {
                date: "DESC"
            }
        })
        
        return notes
    }

    public async findNotesbyStartDate(text: string, startDate: Date) {
        startDate.setUTCHours(0, 0, 0, 0)
        const notes = await this.noteRepository.createQueryBuilder('note')
        .where(
            new Brackets((qb1) => {
                qb1.where(`note.title like :text`, { text: `%${text}%` }).
                orWhere(`note.description like :text`, { text: `%${text}%` });
            })
        )
        .andWhere({
            date: MoreThanOrEqual(startDate)
        })
        .orderBy("note.date", "DESC")        
        .getMany();

        return notes
    }

    public async findNotesbyEndDate(text: string, endDate: Date) {
        endDate.setUTCHours(23, 59, 59, 999)
        const notes = await this.noteRepository.createQueryBuilder('note')
        .where(
            new Brackets((qb1) => {
                qb1.where(`note.title like :text`, { text: `%${text}%` }).
                orWhere(`note.description like :text`, { text: `%${text}%` });
            })
        )
        .andWhere({
            date: LessThanOrEqual(endDate)
        })
        .orderBy("note.date", "DESC")
        .getMany();

        return notes
    }

    public async findNotesbyDateInterval(text: string, startDate: Date, endDate: Date) {
        startDate.setUTCHours(0, 0, 0, 0)
        endDate.setUTCHours(23, 59, 59, 999)

        const notes = await this.noteRepository.createQueryBuilder('note')
            .where(
                new Brackets((qb1) => {
                    qb1.where(`note.title like :text`, { text: `%${text}%` }).
                    orWhere(`note.description like :text`, { text: `%${text}%` });
                })
            )
            .andWhere(`note.date between :startDate and :endDate`, {startDate, endDate})
            .orderBy("note.date", "DESC")
            .getMany()
            
        
        return notes        
    }

} 