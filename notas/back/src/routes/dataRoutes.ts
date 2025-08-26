import { Router } from 'express';
import { Note } from '../entity/Note.entity';
import { NoteRepository } from '../repository/NoteRepository';

const router = Router();

router.get('/notes', async(req, res) => {
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

export default router;