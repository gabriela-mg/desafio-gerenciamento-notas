
import { useParams } from 'react-router';
import { Card, CardContent, Typography, Grid, ButtonGroup, Box } from '@mui/material';
import EditNote from './EditNote';
import { useLazyGetNoteByIdQuery } from '../store/noteApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useContext, useEffect, useState } from 'react';
import StandardImageList from '../components/StandardImageList';
import { useLazyGetImagesQuery, useLazyGetOneImageQuery } from '../store/imageApi';
import DeleteDialog from '../components/DeleteDialog';
import AddImageDialog from '../components/AddImageDialog';
import { ImageContext, ImageProvider } from '../contexts/ImageContext';
function NoteCard() {

    const params = useParams()
    const { changeImages } = useContext(ImageContext)
            
    const [triggerGetOne, { isFetching, isLoading, error }] = useLazyGetNoteByIdQuery()
    const [triggerGetImages] = useLazyGetImagesQuery()
    const [triggerGetOneImage] = useLazyGetOneImageQuery()
    const note = useSelector((state: RootState) => state.notes.note)

    async function getNote(id: string) {
        await triggerGetOne(id)
        const answer = await triggerGetImages(id)
        const keys = answer.data

        if(keys && keys.length > 0 ) {
            keys.map(async (key: string, index) => {
                const image = await triggerGetOneImage(key)
                if(image.data) {
                    changeImages(image.data)
                }
            })
        }
    }

    useEffect(() => {
        if(params.id) {
            getNote(params.id)
        }
        
    }, [] )

    if (!note) {
        return "carregando"
    }


    if(isFetching || isLoading) {
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
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                width: '100%' 
                            }}
                        >
                            <Typography variant='h4'>
                                {note.title}
                            </Typography>
                            <ButtonGroup variant="outlined" >
                                <EditNote/>
                                <DeleteDialog/>
                                <AddImageDialog/>
                            </ButtonGroup>
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Typography variant='h5'> 
                            Descrição:
                        </Typography>
                        <Typography sx={{overflow: 'hidden',  whiteSpace: 'pre-line' }}>
                            {note.description}
                        </Typography>
                    </CardContent>
                     <Grid container 
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >  
                        <CardContent  sx={{display: 'center'}}>
                            <StandardImageList/>
                        </CardContent>
                    </Grid>
                </Card>
            </Grid>   
        </>
    )
}

export default NoteCard