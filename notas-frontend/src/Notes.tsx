import { Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router';
import type { Note } from './Filter';

function Notes({ notes }: { notes: Note[] }) {

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
                { notes?.length === 0 ? (
                        <Typography> Nenhuma nota encontrada</Typography>
                    ) : (
                        notes?.map( note => 
                            
                        
                            <Card sx={{width: '30%'}}>
                                <CardContent>
                                    <Typography fontWeight={'bold'}>
                                        { note?.title } 
                                    </Typography>
                                    <Typography>
                                        { formatDate(note?.date) }
                                    </Typography>
                                    <Typography textOverflow={'ellipsis'} sx = {{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                        { note?.description }
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={"/note/" + note?.id}>
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

export default Notes