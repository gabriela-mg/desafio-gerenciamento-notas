import { Note } from "../database/entities/Note.entity.ts";
import AppDataSource from "../database/data-source.ts";
import { NoteRepository } from "./NoteRepository.ts";
import { Between, Brackets, Like } from "typeorm";

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

    public async findNotesByFilters(text?: string, startDate?: Date, endDate?: Date) {
        if(startDate === undefined) {
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
        } else {
            const notes = await this.noteRepository.createQueryBuilder('note')
            .where(
                new Brackets((qb1) => {
                    qb1.where(`note.title like :text`, { text: `%${text}%` }).
                    orWhere(`note.description like :text`, { text: `%${text}%` });
                })
            )
            .andWhere(`note.date between :startDate and :endDate`, {startDate, endDate}).getMany();

            return notes
        }
       
    }

} 