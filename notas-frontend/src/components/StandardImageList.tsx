import { Box, Button, Grid } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from 'react';
export default function StandardImageList({images}: {images: File[]}) {   

    const [imageSRC] = useState<File[]>([])

    imageSRC.concat(images)


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
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                    <Box sx={{width: '100%'}}>
                        <ImageListItem key={index}>
                            <img
                                src={`${item}`}
                                loading="lazy"
                            />
                            <br/>
                        </ImageListItem>
                        <Button variant="outlined">Remover</Button>
                    </Box> 
                </Grid>
            ))}
        </Grid>
    }
    </>
  );
}