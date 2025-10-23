import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import InputImage from "./InputImage";
import { useContext, useState } from "react";
import { ImageContext } from "../contexts/ImageContext";
import { useAddImageMutation } from "../store/imageApi";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router";

export default function AddImageDialog() {

    const { newImages, cleanInputImages } = useContext(ImageContext)
    
    const navigate = useNavigate()
    
    const note = useSelector((state: RootState) => state.notes.note)

    const [openImageInput, setOpenImageInput] = useState(false)

    const [addImage, { }] = useAddImageMutation()

    function handleClickOpenImage () {
        setOpenImageInput(true)
    }

    function handleCloseImage () {
        setOpenImageInput(false)
        cleanInputImages()
        navigate(0)
    }

    async function handleSubmit() {
        cleanInputImages()
        if(note && note.id) {
            const id = note.id
            addImage({id, images: newImages}).then(() => handleCloseImage())
        }
        
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