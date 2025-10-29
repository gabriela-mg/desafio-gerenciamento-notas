import { Box, Button, Grid } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import { useContext } from 'react';
import { ImageContext } from '../contexts/ImageContext';
import { useDeleteImageMutation } from '../store/imageApi';

export default function StandardImageList() {  

    const { noteImages } = useContext(ImageContext)
    const imagesSRC = noteImages.map((image) => URL.createObjectURL(image))

    function getFileName(index: number) {
        try {
            return noteImages[index].name
        } catch(err) {
            console.log(err)
        }

    }

    const [deleteImage] = useDeleteImageMutation()

    async function handleImageDelete(index: number) {
        const key = getFileName(index)
        if(key) {
            await deleteImage(key)
        }
    }

    return (
    <>
    {imagesSRC.length > 0 && 
        <Grid container spacing={2} rowSpacing={1} 
            columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
            columns={{ xs: 4, sm: 8, md: 12 }}
        >
            {imagesSRC.map((item, index) => (
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                    <Box key={index} sx={{width: '100%'}}>
                        <ImageListItem key={index}>
                            <img
                                src={`${item}`}
                                alt={`Image ${index + 1}`}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: 'auto', 
                                    maxHeight: '200px',
                                    objectFit: 'contain'
                                }}
                            />
                            <br/>
                        </ImageListItem>
                         <Box sx={{justifyContent: 'center', alignContent: 'center', display: 'flex',}}>
                        
                        <Button variant="outlined" onClick={() => handleImageDelete(index)}>Remover</Button> </Box>
                    </Box> 
                </Grid>
            ))}
        </Grid>
    }
    </>
  );
}