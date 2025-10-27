import { Button, ButtonGroup, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import { useDeleteNoteMutation } from "../store/noteApi";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function DeleteDialog() {

    const note = useSelector((state: RootState) => state.notes.note)
    
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const [deleteNote] = useDeleteNoteMutation()

    const navigate = useNavigate();
    

    const onDeleteNote = async() => {
        if(note && note.id) {
            await deleteNote(note.id)
                handleCloseDelete()
                navigate("/")
            }
        }

    function handleClickOpenDelete () {
        setOpenDeleteDialog(true)
    }

    function handleCloseDelete () {
       setOpenDeleteDialog(false)
    }


    return <>
        <Button>
            <Typography  onClick={handleClickOpenDelete}>
                Remover
            </Typography>
        </Button>
        <Dialog open={openDeleteDialog} onClose={handleCloseDelete} sx={{ width: '100%'}} fullWidth={true}>
            <DialogTitle>REMOVER NOTA</DialogTitle>
            <DialogContent>
                <Typography paddingBottom={'2%'}> Deseja mesmo excluir a nota? </Typography>
                <ButtonGroup>
                    <Button onClick={onDeleteNote}> REMOVER </Button>
                    <Button onClick={handleCloseDelete}> CANCELAR </Button>
                </ButtonGroup>   
            </DialogContent>
        </Dialog>
    </>
}