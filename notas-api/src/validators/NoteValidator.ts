import { Request, Response } from 'express'
import Note from './noteGetSchema'
import NoteGetSchema from './noteGetSchema'
import NoteGetOneSchema from './noteGetOneSchema'
import NotePostSchema from './notePostSchema'
import NotePutSchema from './notePutSchema'
import NoteDeleteSchema from './noteDeleteSchema'

export class NoteValidator {

    public validadeGetNotes(req: Request, res: Response, next) {
        try{
            const query = NoteGetSchema.parse({text: req.query.text, date: req.query.date})
            console.log("oi")
            //req.query = query
            next()
        } catch(error) {
            console.log(error)
            res.sendStatus(400)
        }
    }
    
    public validadeGetOneNote(req: Request, res: Response, next) {
        try {
            const param = NoteGetOneSchema.parse({id: req.params.id})
            //req.params = param
            next()
        } catch(error) {
            res.sendStatus(400)
        }
        
    }
    public validadePostNote(req: Request, res: Response, next) {
        try {
            const body = NotePostSchema.parse({title: req.body.title, description: req.body.description})
           // req.body = body
            next()
        } catch(error) {
            res.sendStatus(400)
        }
    }

    public validadePutNote(req: Request, res: Response, next) {
        try {
            const body = NotePutSchema.parse({id: req.params.id, title: req.body.title, description: req.body.description})
           // req.body = body
            console.log(req.params.id)
            next()
        } catch(error) {
            console.log(error)
            res.sendStatus(400)
        }
    }

    public validadeDeleteNote(req: Request, res: Response, next) {
        try {
            const param = NoteDeleteSchema.parse({id: req.params.id})
            next()
        } catch(error) {
            res.sendStatus(400)
        }
    }
}