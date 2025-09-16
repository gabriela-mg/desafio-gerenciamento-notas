import { Request, Response } from 'express'
import Note from './noteSchema'

export class NoteValidator {
    public validateBody(req: Request, res: Response, next) {
        try {
            Note.parse({id: null, title: req.body.title, description: null, text: req.body.description, date: null})
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