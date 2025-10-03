
import { useParams } from 'react-router';
import { Card, CardContent, Typography, Grid, ButtonGroup, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import EditNote from './EditNote';
import { useNavigate } from "react-router-dom";
import { useDeleteNoteMutation, useGetNoteByIdQuery, useLazyGetNotesQuery } from '../store/noteApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useState } from 'react';
function NoteCard() {

    const params = useParams()
    const navigate = useNavigate();

    const [open, setOpen] = useState(false)


    const [deleteNote] = useDeleteNoteMutation()
    
    const [triggerGetAll, { isFetching, error }] = useLazyGetNotesQuery()

    useGetNoteByIdQuery(params.id)
    const note = useSelector((state: RootState) => state.notes.note)

    if (!note) {
        return "carregando"
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const onDeleteNote = async() => {
        await deleteNote(note.id)
        triggerGetAll(undefined)
        handleClose()
        navigate(-1)
    }

    if(isFetching) {
        <Typography> Carregando</Typography>
    }

    if(error) {
        <Typography color="red"> Erro </Typography>
    }

    return(  
        <>
            <Grid container 
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >  
                <Card sx={{width: '80%'}}>
                    <CardContent>
                        <Typography variant='h4'>
                            {note.title}
                        </Typography>
                        <ButtonGroup variant="outlined" >
                            <EditNote></EditNote>
                            <Button>
                                <Typography  onClick={handleClickOpen}>
                                    Remover
                                </Typography>
                            </Button>
                            <Button>
                                <Typography>
                                    Adicionar Imagens
                                </Typography>
                            </Button>
                        </ButtonGroup>
                    </CardContent>
                    <CardContent>
                        <Typography variant='h6'> 
                            Descrição:
                        </Typography>
                        <Typography sx={{overflow: 'hidden',  whiteSpace: 'pre-line' }}>
                            {note.description}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        Imagens
                    </CardContent>
                </Card>
            </Grid>   
            <Dialog open={open} onClose={handleClose} sx={{ width: '100%'}} fullWidth={true}>
                <DialogTitle>REMOVER NOTA</DialogTitle>
                <DialogContent>
                    <Typography> Deseja mesmo excluir a nota? </Typography>
                    <Button onClick={onDeleteNote}> REMOVER </Button>
                    <Button onClick={handleClose}> CANCELAR </Button>
                </DialogContent>
                
            </Dialog>
        </>
    )
}

export default NoteCard