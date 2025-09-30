import { Typography } from '@mui/material';
import Filter from './pages/Filter.tsx';

function Home() {
    
    return(
        <>
        <Typography variant='h2'>Suas notas</Typography>
        
            <Filter></Filter>
        </>
    )
}

export default Home