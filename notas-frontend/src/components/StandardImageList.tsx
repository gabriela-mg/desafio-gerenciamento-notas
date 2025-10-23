import { Box, Button, Grid, Typography } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import { useContext, useState } from 'react';
import { ImageContext } from '../contexts/ImageContext';

export default function StandardImageList() {  

    const { images } = useContext(ImageContext)

    console.log(images)

    return (
    <>
    {images.length > 0 && 
        <Grid container spacing={2} rowSpacing={1} 
            columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
            columns={{ xs: 4, sm: 8, md: 12 }}
        >
            {images.map((item, index) => (
                <>
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                    <Box key={index} sx={{width: '100%'}}>
                        <ImageListItem key={index}>
                            <img
                                src={`${item}`}
                                alt={`Image ${index + 1}`}
                                loading="lazy"
                                style={{
                                    width: '100%', // Makes the image take the full width of the Grid item
                                    height: 'auto', // Maintains the aspect ratio
                                    maxHeight: '200px', // Ensures a minimum visible height (adjust as needed)
                                    objectFit: 'contain'
                                }}
                            />
                            <br/>
                        </ImageListItem>
                        <Button variant="outlined">Remover</Button>
                    </Box> 
                </Grid>
                </>
            ))}
        </Grid>
    }
    </>
  );
}