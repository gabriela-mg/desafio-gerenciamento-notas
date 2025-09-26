import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import { InputLabel, TextField } from '@mui/material';
import {  useNavigate } from 'react-router';
import { makeApiNoteRoute } from './routes/constRoutes';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import type { NotePostForm } from './schema/notePostSchema';
import NotePostSchema from './schema/notePostSchema';

export default function NewNote() {
    const [open, setOpen] = useState(false);

    const { register, handleSubmit } = useForm<NotePostForm>({
        resolver: zodResolver(NotePostSchema)
    })

    
    const navigate = useNavigate()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  const onSubmit = (data: any) => {
        axios.post(makeApiNoteRoute(), data).then(() => {
            navigate(0)
        })
        handleClose();
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Adicionar
            </Button>
            <Dialog open={open} onClose={handleClose} sx={{ width: '100%'}} fullWidth={true}>
                <DialogTitle>NOVA NOTA</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            {...register("description", {required: true})}
                        />
                        <Button type="submit"> Criar </Button>
                        <Button onClick={handleClose}> Cancelar </Button>
                    </form>          
                </DialogContent>
                
            </Dialog>
        </>
    );
}