import { Typography } from '@mui/material';
import Filter from './Filter.tsx';
import NoteList from './NoteList.tsx';
import { ImageProvider } from '../contexts/ImageContext.tsx';

function Home() {
    
    return <>
        <Typography variant='h2'>Suas notas</Typography>
        <ImageProvider>
        <Filter/>
        </ImageProvider>
        
        <NoteList/>     
    </>
}

export default Home