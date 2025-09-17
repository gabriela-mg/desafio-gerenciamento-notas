import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ButtonGroup, Input, InputLabel, OutlinedInput } from '@mui/material';
type Note = {
    title: string,
    description: string,
    id: string
}

export default function EditNote({note}: {note: Note}) {
  
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(note.title)
    const [desc, setDesc] = useState(note.description)

    useEffect(() => {
        console.log(title)
    }, [title])

    const handleClickOpen = () => {
        setOpen(true);
        
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTitleChange = (e: any) => {
        setTitle(e.target.value);
    };
  
    const handleDescChange = (e: any) => {
        setDesc(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const createNote = {
            title: title,
            description: desc
        }
        
        axios.put(`http://localhost:3000/api/note/${note.id}`, createNote).then(() => {
            window.location.href = `http://localhost:5173/note/${note.id}`
        })
        handleClose();
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Editar
            </Button>
            <Dialog open={open} onClose={handleClose} sx={{ width: '100%'}} fullWidth={true}>
                <DialogTitle>EDITAR NOTA</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} action="/">
                        <InputLabel>Titulo*</InputLabel>
                        <Input
                            autoFocus
                            required
                            margin="dense"
                            id="title"
                            name="title"
                            type="text"
                            fullWidth
                            value={ title }
                            onChange={ handleTitleChange }
                        />

                        <InputLabel>Descrição*</InputLabel>
                        <OutlinedInput
                            autoFocus
                            required
                            margin="dense"
                            id="description"
                            name="description"
                            type="text"
                            fullWidth
                            maxRows={10}
                            minRows={3}
                            multiline
                            value={desc}
                            onChange={handleDescChange}
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