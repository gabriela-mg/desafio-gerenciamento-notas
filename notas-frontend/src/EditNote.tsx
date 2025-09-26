import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import { ButtonGroup, InputLabel    , TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { makeApiNoteRoute } from './routes/constRoutes';
import { useForm } from 'react-hook-form';
import type { NotePutForm } from './schema/notePutSchema';
import NotePutSchema from './schema/notePutSchema';
import { zodResolver } from '@hookform/resolvers/zod';
type Note = {
    title: string,
    description: string,
    id: string
}

export default function EditNote({note}: {note: Note}) {
  
    const [open, setOpen] = useState(false)

    const { register, handleSubmit } = useForm<NotePutForm>({
        resolver: zodResolver(NotePutSchema)
    })

    
    const navigate = useNavigate()

    const handleClickOpen = () => {
        setOpen(true);
        
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (data: any) => {        
        axios.put(makeApiNoteRoute(note.id), data).then(() => {
            navigate(0)
        })
        handleClose();
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                <Typography>
                    Editar
                </Typography>
            </Button>
            <Dialog open={open} onClose={handleClose} sx={{ width: '100%'}} fullWidth={true}>
                <DialogTitle>EDITAR NOTA</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} action="/">
                        <InputLabel>Titulo*</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            type="text"
                            fullWidth
                            { ...register("title", {required: true})}

                        />

                        <InputLabel>Descrição*</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            type="text"
                            fullWidth
                            maxRows={10}
                            minRows={3}
                            multiline
                            { ...register("description", {required: true})}
                        />
                        <br/>
                        <br/>
                        <ButtonGroup>
                            <Button type="submit"> Editar </Button>
                            <Button onClick={handleClose}> Cancelar </Button>
                        </ButtonGroup>
                        
                    </form>          
                </DialogContent>
            </Dialog>
        </>
    )
}