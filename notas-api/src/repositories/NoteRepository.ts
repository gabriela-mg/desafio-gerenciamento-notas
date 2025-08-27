import { Note } from "../database/entity/Note.entity";
import { AppDataSource } from "../data-source";

const NoteRepository = AppDataSource.getRepository(Note)

export default NoteRepository;