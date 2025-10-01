
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Card, CardContent, Typography, Grid, ButtonGroup, Button, Alert } from '@mui/material';
import EditNote from './EditNote';
import { useNavigate } from "react-router-dom";
import { makeApiNoteRoute } from '../routes/constRoutes';
import { useGetNotebyIdQuery } from '../store/noteSlice';

type Note = {
    title: string,
    description: string,
    id: string
}

function NoteCard() {

    const params = useParams()
    const navigate = useNavigate();

    const { data, error, isLoading } = useGetNotebyIdQuery(params.id)
    

    const deleteNote = async() => {
        const answer = await axios.delete(makeApiNoteRoute(params.id))
        if(answer.status === 200) {
           navigate(-1)
        } 
    }

    if(error) {
        return <Alert severity="error"> {} </Alert>
    }

    if (!data) {
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
                        {data.title}
                    </Typography>
                    <ButtonGroup variant="outlined" >
                        <EditNote note={data}></EditNote>
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
                        {data.description}
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