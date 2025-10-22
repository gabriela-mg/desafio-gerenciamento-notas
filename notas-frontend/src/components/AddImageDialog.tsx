import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import InputImage from "./InputImage";
import { useContext, useState } from "react";
import { ImageContext } from "../contexts/ImageContext";
import { useAddImageMutation } from "../store/imageApi";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function AddImageDialog() {

    const { images, cleanImages } = useContext(ImageContext)
    
    const note = useSelector((state: RootState) => state.notes.note)

    const [openImageInput, setOpenImageInput] = useState(false)

    const [addImage, { }] = useAddImageMutation()

    function handleClickOpenImage () {
        setOpenImageInput(true)
    }

    function handleCloseImage () {
       setOpenImageInput(false)
       cleanImages()
    }

    async function handleSubmit() {
        console.log("1")
        if(note && note.id) {
            console.log("2")
            const id = note.id
            if(images.length > 0) {     
                console.log("3")       
                await addImage({id, images})
            }
        }
        
        handleCloseImage();
    }

    return <>
        <Button>
            <Typography onClick={handleClickOpenImage}>
                Adicionar Imagens
            </Typography>
        </Button>
        <Dialog open={openImageInput} onClose={handleCloseImage} sx={{ width: '100%'}} fullWidth={true}>
            <DialogTitle>ADICIONAR IMAGEM</DialogTitle>
            <DialogContent>
                <InputImage/>
                <Button onClick={handleSubmit}>SALVAR</Button>
                <Button onClick={handleCloseImage}> CANCELAR </Button>
            </DialogContent>
        </Dialog>
    </>
}