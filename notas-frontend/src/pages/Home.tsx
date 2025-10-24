import { Box, Typography } from '@mui/material';
import Filter from './Filter.tsx';
import NoteList from './NoteList.tsx';
import { theme } from '../theme/theme.tsx';

function Home() {
    
    return <>
        <Box
            color={theme.palette.primary.contrastText} 
            bgcolor={theme.palette.primary.dark}
            justifyContent={'center'}
            justifyItems={'center'}
        >
            <Typography variant='h2' padding={'1%'}>
                Suas notas
            </Typography>
        </Box>
        <Box 
            bgcolor={theme.palette.primary.light} 
            padding={"2% 5% 2% 5%"} 
        >
            <Filter/>        
            <NoteList/>    
        </Box>
    </>
}

export default Home