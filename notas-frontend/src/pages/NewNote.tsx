import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext, useState } from 'react';
import { Box, ButtonGroup, Grid, InputLabel, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import type { NotePostForm } from '../schema/notePostSchema';
import NotePostSchema from '../schema/notePostSchema';
import { useAddNoteMutation } from '../store/noteApi';
import InputImage from '../components/InputImage';
import { ImageContext } from '../contexts/ImageContext';
import { useAddImageMutation } from '../store/imageApi';

export default function NewNote() {
    const [open, setOpen] = useState(false);
    const { newImages, cleanInputImages } = useContext(ImageContext);

    const { register, handleSubmit, setValue } = useForm<NotePostForm>({
        resolver: zodResolver(NotePostSchema)
    })

    const [addNote, { }] = useAddNoteMutation()
    const [addImage, { }] = useAddImageMutation()
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setValue("title", "")
        setValue("description", "")
        cleanInputImages()
        setOpen(false);
    };

    const onSubmit = async (data: {title: string, description: string}) => {
        addNote(data).then(async (res) => {
            const id = res.data?.id
            if(newImages.length > 0) {            
                await addImage({id, images: newImages})
            }
        })
        handleClose();
    }

    return <>
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
                    <InputImage />
                    <ButtonGroup>
                        <Button type="submit"> Criar </Button>
                        <Button onClick={handleClose}> Cancelar </Button>
                    </ButtonGroup>                   
                </form>          
            </DialogContent>
            
        </Dialog>
    </>
}