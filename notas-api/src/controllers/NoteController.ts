import { Request, Response } from 'express'
import { NoteService } from "../services/NoteService";

export class NoteController {

    constructor(private noteService: NoteService) {
       this.noteService = noteService
    }

    public getNotes = async (req: Request, res: Response) => {
        try {
            const { date, text} = req.query
            const notes = await this.noteService.selectNotes(text, date)

            res.send(notes)
            res.status(200)
        } catch(error) {
            res.sendStatus(500)
        }
    }

    public getOneNote = async (req: Request, res: Response) => {
        try {
            const note = await this.noteService.selectNoteByID(req.params.id)
            res.send(note)
            res.status(200)
        } catch(error) {
            res.sendStatus(500)
        }

    }

    public addNote = async (req: Request, res: Response) => {
        try {
            const note = await this.noteService.createNote(req.body.title, req.body.description)
            res.send(note)
            res.status(200)
        } catch(error) {
            res.sendStatus(500)
        }
    }

    public updateNote = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const title = req.body.title
            const description = req.body.description

            const answer = await this.noteService.updateNote(id, title, description)

            res.sendStatus(answer ? 200 : 404)
        } catch(error) {
            res.sendStatus(500)
        }
    }

    public deleteNote = async (req: Request, res: Response) => {
        try {
            const answer = await this.noteService.deleteNote(req.params.id)

            res.sendStatus(answer ? 200 : 404)
        } catch(error) {
            res.sendStatus(500)
        }
    }
}