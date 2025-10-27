import { Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router';
import { Box } from '@mui/system';
import type { Note } from '../type/Note';
import { makeFrontNoteRoute } from '../routes/constRoutes';
import { useSelector } from 'react-redux';
import { type RootState } from '../store/store';
import { useLazyGetNotesQuery } from '../store/noteApi';
import { useContext, useEffect } from 'react';
import { ImageContext } from '../contexts/ImageContext';

function NoteList() {

    const { cleanImages } = useContext(ImageContext)

    const notes = useSelector((state: RootState) => state.notes.notes)

    const [getNotes] = useLazyGetNotesQuery()

    function formatDate(data: string) {
        const newDate = new Date(data)
        const formattedDate = newDate.toLocaleDateString()
        return formattedDate
    }

    useEffect(() => {
        getNotes(undefined)
        cleanImages()
    }, [])
    
    return(
        <>
            <Grid 
                container 
                spacing={2} 
                rowSpacing={1} 
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    columnCount: 3
                }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                { !notes || notes.length === 0 ? (
                        <Typography> Nenhuma nota encontrada</Typography>
                    ) : (
                        notes.map( (note: Note, index: number) =>  
                            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>                      
                                <Card  key={index}>
                                    <CardContent>
                                        <Box 
                                            sx={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center', 
                                                width: '100%',
                                                borderBottom: 2
                                            }}
                                        >
                                            <Typography fontWeight={'bold'}>
                                                { note.title } 
                                            </Typography>
                                            <Typography variant='body2' alignSelf={'start'}>
                                                { formatDate(note.date) }
                                            </Typography>
                                        </Box>
                                        
                                        <Typography textOverflow={'ellipsis'} sx = {{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                            { note.description }
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to={makeFrontNoteRoute(note.id)}>
                                            <Typography> Ver mais </Typography>
                                        </Link>                
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    ) 
                }
            </Grid>
        </>
    )

  
}

export default NoteList