import { Typography } from '@mui/material';
import Filter from './Filter.tsx';
import NoteList from './NoteList.tsx';
import { ImageProvider } from '../contexts/ImageContext.tsx';

function Home() {
    
    return <>
    <ImageProvider>
        <Typography variant='h2'>Suas notas</Typography>
        
        <Filter/>
        <NoteList/>
    </ImageProvider>
        

    </>
}

export default Home