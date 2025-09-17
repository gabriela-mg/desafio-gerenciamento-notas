import * as express from "express"
import { NoteController } from "../controllers/NoteController"
import { NoteService } from "../services/NoteService"
import { TypeORMNoteRepository } from "../repositories/TypeORMNoteRepository"
import { NoteValidator } from "../validators/NoteValidator"

const noteRoutes = express.Router()
const noteService = new NoteService(new TypeORMNoteRepository)
const noteController = new NoteController(noteService)
const noteValidator = new NoteValidator()


const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
noteRoutes.use(timeLog)

noteRoutes.get('/note', noteValidator.validadeGetNotes, noteController.getNotes)

noteRoutes.get('/note/:id', noteValidator.validadeGetOneNote, noteController.getOneNote)

noteRoutes.post('/note', noteValidator.validadePostNote, noteController.addNote)

noteRoutes.put('/note/:id', noteValidator.validateParams, noteValidator.validateBody, noteController.updateNote)

noteRoutes.delete('/note/:id', noteValidator.validateParams, noteController.deleteNote)

export default noteRoutes