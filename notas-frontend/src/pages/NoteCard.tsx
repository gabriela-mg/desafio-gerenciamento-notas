
import { useParams } from 'react-router';
import { Card, CardContent, Typography, Grid, ButtonGroup, Button, Dialog, DialogTitle, DialogContent, Box } from '@mui/material';
import EditNote from './EditNote';
import { useNavigate } from "react-router-dom";
import { useDeleteNoteMutation, useLazyGetNoteByIdQuery } from '../store/noteApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useContext, useEffect, useState } from 'react';
import StandardImageList from '../components/StandardImageList';
import InputImage from '../components/InputImage';
import { ImageContext } from '../contexts/ImageContext';
import { useLazyGetImagesQuery, useLazyGetOneImageQuery } from '../store/imageApi';
function NoteCard() {

    const params = useParams()
    const navigate = useNavigate();
        
    const { cleanImages } = useContext(ImageContext);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [openImageInput, setOpenImageInput] = useState(false)

    const [deleteNote] = useDeleteNoteMutation()
    
    const [triggerGetOne, { isFetching, isLoading, error }] = useLazyGetNoteByIdQuery()
    const [triggerGetImages] = useLazyGetImagesQuery()
    const [triggerGetOneImage] = useLazyGetOneImageQuery()
    const [images] = useState<File[]>( [])

    const note = useSelector((state: RootState) => state.notes.note)

    async function getNote(id: string) {
        await triggerGetOne(id)
        const answer = await triggerGetImages(id)
        const keys = answer.data

        if(keys && keys.length > 0 ) {
            keys.map(async (key: string) => {
                const image = await triggerGetOneImage(key)
                if(image.data) images.push(image.data)
            })
        }
    }

    useEffect(() => {
        console.log("oi")
        if(params.id) {
            getNote(params.id)
        }
        
    },[] )

    if (!note) {
        return "carregando"
    }

    function handleClickOpenDelete () {
        setOpenDeleteDialog(true)
    }

    function handleCloseDelete () {
       setOpenDeleteDialog(false)
    }

    function handleClickOpenImage () {
        setOpenImageInput(true)
    }

    function handleCloseImage () {
       setOpenImageInput(false)
       cleanImages()
    }

    const onDeleteNote = async() => {
        await deleteNote(note.id)
        handleCloseDelete()
        navigate("/")
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
                                <EditNote></EditNote>
                                <Button>
                                    <Typography  onClick={handleClickOpenDelete}>
                                        Remover
                                    </Typography>
                                </Button>
                                <Button>
                                    <Typography onClick={handleClickOpenImage}>
                                        Adicionar Imagens
                                    </Typography>
                                </Button>
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
                            <StandardImageList images={images}/>
                        </CardContent>
                    </Grid>
                </Card>
            </Grid>   
            <Dialog open={openDeleteDialog} onClose={handleCloseDelete} sx={{ width: '100%'}} fullWidth={true}>
                <DialogTitle>REMOVER NOTA</DialogTitle>
                <DialogContent>
                    <Typography> Deseja mesmo excluir a nota? </Typography>
                    <Button onClick={onDeleteNote}> REMOVER </Button>
                    <Button onClick={handleCloseDelete}> CANCELAR </Button>
                </DialogContent>
            </Dialog>
            <Dialog open={openImageInput} onClose={handleCloseImage} sx={{ width: '100%'}} fullWidth={true}>
                <DialogTitle>ADICIONAR IMAGEM</DialogTitle>
                <DialogContent>
                    <InputImage/>
                    <Button onClick={handleCloseImage}> CANCELAR </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default NoteCard