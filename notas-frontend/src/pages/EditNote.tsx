import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, InputLabel, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import type { NotePutForm } from '../schema/notePutSchema';
import NotePutSchema from '../schema/notePutSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateNoteMutation } from '../store/noteApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function EditNote() {
  
    const [open, setOpen] = useState(false)

    const note = useSelector((state: RootState) => state.notes.note)

    const { register, handleSubmit, setValue } = useForm<NotePutForm>({
        resolver: zodResolver(NotePutSchema),
        defaultValues: {title: "", description: ""}
    })

    useEffect(() => {
        if(!note) return
        setValue("title", note.title)
        setValue("description", note.description)
    }, [note])

    const [updateNote] = useUpdateNoteMutation()
   
    if (!note) {
        return "carregando"
    }
    

    const handleClickOpen = () => {
        setOpen(true);
        
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (data: any) => {    
        await updateNote({id: note.id, title: data.title, description: data.description})
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