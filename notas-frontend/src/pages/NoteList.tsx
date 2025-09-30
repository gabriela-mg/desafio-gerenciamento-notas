import { Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router';
import { Box } from '@mui/system';
import type { Note } from '../type/Note';
import { makeFrontNoteRoute } from '../routes/constRoutes';

function NoteList({ notes }: { notes: Note[] }) {

     function formatDate(data: string) {
        const newDate = new Date(data)
        const formattedDate = newDate.toLocaleDateString()
        return formattedDate
    }

    return(
        <>
            <Grid container spacing={2} rowSpacing={1} 
                columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                { !notes || notes.length === 0 ? (
                        <Typography> Nenhuma nota encontrada</Typography>
                    ) : (
                        notes.map( (note, index) =>                        
                            <Card sx={{width: '30%'}} key={index}>
                                <CardContent>
                                    <Box 
                                        sx={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center', 
                                            width: '100%' 
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
                                <CardActions>"/
                                    <Link to={makeFrontNoteRoute(note.id)}>
                                        <Typography> Ver mais </Typography>
                                    </Link>                
                                </CardActions>
                            </Card>
                        )
                    ) 
                }
            </Grid>
        </>
    )

  
}

export default NoteList