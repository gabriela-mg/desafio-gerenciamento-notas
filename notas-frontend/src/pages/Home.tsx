import { Typography } from '@mui/material';
import Filter from './Filter.tsx';
import NoteList from './NoteList.tsx';

function Home() {
    
    return <>
        <Typography variant='h2'>Suas notas</Typography>
        <Filter/>        
        <NoteList/>     
    </>
}

export default Home