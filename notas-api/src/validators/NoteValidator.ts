import { Request, RequestHandler, Response } from 'express'
import NoteGetSchema from './noteGetSchema'
import NoteGetOneSchema from './noteGetOneSchema'
import NotePostSchema from './notePostSchema'
import NotePutSchema from './notePutSchema'
import NoteDeleteSchema from './noteDeleteSchema'

export class NoteValidator {

    public validadeGetNotes: RequestHandler= (req, res, next) =>{
        try{
            const getNotes = NoteGetSchema.parse({text: req.query.text, startDate: req.query.startDate, endDate: req.query.endDate})
            req.body = {
                text: getNotes.text,
                startDate: getNotes.startDate,
                endDate: getNotes.endDate
            }
            next()
        } catch(error) {
            console.log(error)
            res.sendStatus(400)
        }
    }
    
    public validadeGetOneNote(req: Request, res: Response, next) {
        try {
            const getOneParam = NoteGetOneSchema.parse({id: req.params.id})
            req.params = {
                id: getOneParam.id
            }
            next()
        } catch(error) {
            res.sendStatus(400)
        }
        
    }
    
    public validadePostNote(req: Request, res: Response, next) {
        try {
            const postBody = NotePostSchema.parse({title: req.body.title, description: req.body.description})
            req.body = {
                title: postBody.title,
                description: postBody.description
            }
            next()
        } catch(error) {
            res.sendStatus(400)
        }
    }

    public validadePutNote(req: Request, res: Response, next) {
        try {
            const putBody = NotePutSchema.parse({id: req.params.id, title: req.body.title, description: req.body.description})
            req.body = {
                title: putBody.title,
                description: putBody.description
            }

            req.params = {
                id: putBody.id
            }

            next()
        } catch(error) {
            console.log(error)
            res.sendStatus(400)
        }
    }

    public validadeDeleteNote(req: Request, res: Response, next) {
        try {
            const deleteParam = NoteDeleteSchema.parse({id: req.params.id})
            req.params = {
                id: deleteParam.id
            }
            next()
        } catch(error) {
            res.sendStatus(400)
        }
    }
}