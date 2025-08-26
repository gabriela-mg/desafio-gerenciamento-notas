import { Router } from 'express';
import { NoteRepository } from '../repository/NoteRepository';

const router = Router();

router.get('/', async(req, res) => {
    try {
        const notes = await NoteRepository.find({
            order: {id:'ASC'}
        });

        res.json({
            sucess: true,
            count: notes.length,
            notes
        });
    } catch(error) {
        res.status(500).json({
            sucess: false,
            error: error.message
        })
    }
})

router.post('/note', async(req, res) => {
    try {
        const title = req.body.title; 
        const description = req.body.description;
        const note = NoteRepository.create({title, description});
        const savedNote = await NoteRepository.save(note);

        res.json({
            sucess: true,
            note: savedNote
        });
    } catch(error) {
        res.status(400).json({
            sucess: false,
            error: error.message
        })
    }
})

export default router;