
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Card, CardContent, Typography, Grid, ButtonGroup, Button, Alert } from '@mui/material';
import EditNote from './EditNote';
import { useNavigate } from "react-router-dom";
import { makeApiNoteRoute } from '../routes/constRoutes';

type Note = {
    title: string,
    description: string,
    id: string
}

function NoteCard() {

    const params = useParams()
    const navigate = useNavigate();
    const [note, setNote] = useState<Note>()
    const [error, setError] = useState<string>("")

    useEffect(() => {
        axios.get(makeApiNoteRoute(params.id))
        .then((response) => {
            setNote(response.data)
        })
        .catch(error => console.error("Erro ao buscar nota", error))
    }, [])

    const deleteNote = async() => {
        const answer = await axios.delete(makeApiNoteRoute(params.id))
        if(answer.status === 200) {
           navigate(-1)
        } else {
            setError("Erro ao deletar nota")
        }
    }

    if(error) {
        return <Alert severity="error"> {error} </Alert>
    }

    if (!note) {
        return "carregando"
    }

    return(  
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
                        <EditNote note={note}></EditNote>
                        <Button>
                            <Typography  onClick={deleteNote}>
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
                        {note?.description}
                    </Typography>
                </CardContent>
                <CardContent>
                    Imagens
                </CardContent>
            </Card>
        </Grid>   
    )
}

export default NoteCard