import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, Typography, Grid, ButtonGroup, Box, IconButton } from '@mui/material';
import EditNote from './EditNote';
import { useLazyGetNoteByIdQuery } from '../store/noteApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useContext, useEffect } from 'react';
import StandardImageList from '../components/StandardImageList';
import { useLazyGetImagesQuery, useLazyGetOneImageQuery } from '../store/imageApi';
import DeleteDialog from '../components/DeleteDialog';
import AddImageDialog from '../components/AddImageDialog';
import { ImageContext } from '../contexts/ImageContext';
import HomeIcon from '@mui/icons-material/Home';
import { theme } from '../theme/theme';


function NoteCard() {

    const params = useParams()

    const { changeImages, cleanImages } = useContext(ImageContext)

    const navigate = useNavigate()
            
    const [triggerGetOne, { isFetching, isLoading, error }] = useLazyGetNoteByIdQuery()
    const [triggerGetImages] = useLazyGetImagesQuery()
    const [triggerGetOneImage] = useLazyGetOneImageQuery()
    const note = useSelector((state: RootState) => state.notes.note)

    async function getNote(id: string) {
        await triggerGetOne(id)
        const answer = await triggerGetImages(id)
        const keys = answer.data

        if(keys && keys.length > 0 ) {
            keys.map(async (key: string) => {
                const image = await triggerGetOneImage(key)
                if(image.data) {
                    changeImages(image.data)
                }
            })
        }
    }

    function goHome() {
        navigate("/")
    }

    useEffect(() => {
        cleanImages()
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
        <Box style={{backgroundColor: theme.palette.secondary.dark}} height={'100vh'}>
            <Grid container 
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
                bgcolor={theme.palette.secondary.dark} 
            >  
                <Card sx={{width: '90%'}} style={{backgroundColor: theme.palette.secondary.light}}>
                    <CardContent > 
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                width: '100%' 
                            }}
                        >
                            <IconButton onClick={goHome}>
                                <HomeIcon fontSize="large" sx={{color: theme.palette.secondary.dark}}/>
                            </IconButton>
                            <ButtonGroup>
                                <EditNote/>
                                <DeleteDialog/>
                                <AddImageDialog/>
                            </ButtonGroup>
                        </Box>
                    </CardContent>
                        <Box 
                            sx={{
                                justifyContent: 'center', 
                                alignContent: 'center', 
                                display: 'flex',
                                borderBottom: 2, borderTop: 2
                            }}
                            padding = {'1%'}
                        >
                            <Typography variant='h4' fontWeight={'bold'}>
                                {note.title}
                            </Typography>
                        </Box>
                    <CardContent>
                        <Typography variant='h5' fontWeight={'bold'}> 
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
            </Box>
        </>
    )
}

export default NoteCard