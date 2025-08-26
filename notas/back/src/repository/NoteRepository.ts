import { AppDataSource } from "../data-source"
import { Note } from "../entity/Note.entity"

export const NoteRepository = AppDataSource.getRepository(Note)
