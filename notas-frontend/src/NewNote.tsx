import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import { Input, InputLabel, OutlinedInput } from '@mui/material';
import { redirect } from 'react-router';


export default function NewNote() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTitle("")
        setDesc("")
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
        
        console.log(createNote)
        axios.post("http://localhost:3000/api/note", createNote).then((response) => {
            console.log(response.status, response.data)
            redirect("/")
        })
        handleClose();
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Adicionar
            </Button>
            <Dialog open={open} onClose={handleClose} sx={{ width: '100%'}} fullWidth={true}>
                <DialogTitle>NOVA NOTA</DialogTitle>
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
                        <Button type="submit"> Criar </Button>
                        <Button onClick={handleClose}> Cancelar </Button>
                    </form>          
                </DialogContent>
                
            </Dialog>
        </>
    );
}