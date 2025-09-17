import { Request, Response } from 'express'
import Note from './noteGetSchema'
import NoteGetSchema from './noteGetSchema'
import NoteGetOneSchema from './noteGetOneSchema'
import NotePostSchema from './notePostSchema'
import NotePutSchema from './notePutSchema'

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
            console.log(body)
           // req.body = body
            console.log(req.params.id)
            next()
        } catch(error) {
            console.log(error)
            res.sendStatus(400)
        }
    }

    public validadeDeleteNote() {
        
    }
    public validateBody(req: Request, res: Response, next) {
        try {
            const body = Note.parse({id: null, title: req.body.title, description: req.body.description, text: null, date: null})
            req.body = body
                        next()

        } catch(error) {
            res.sendStatus(400)
        }
    }

    public validateParams(req: Request, res: Response, next) {
        try {
            Note.parse({id: req.params.id, title: null, description: null, text: null, date: null})
            next()
        } catch(error) {
            res.sendStatus(400)
        }
    }

    public validateQuery(req: Request, res: Response, next) {
        try {
            const date = req.query.date===undefined ? null : req.query.date       
            const text = req.query.text===undefined ? null : req.query.text;

            Note.parse({id: null, title: null, description: null, text: text, date: date})
            next()
        } catch(error) {
            res.sendStatus(400)

        }
    }
}