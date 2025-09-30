import { Button, Grid, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import NoteList from "./NoteList";
import NewNote from "./NewNote";
import { makeApiNoteRoute } from "../routes/constRoutes";
import type { Note } from "../type/Note";
import { useForm } from "react-hook-form";
import type { NoteGetForm } from "../schema/noteGetSchema";
import NoteGetSchema from "../schema/noteGetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function Filter() {

    const { register, handleSubmit, reset } = useForm<NoteGetForm>({
        defaultValues: {text: "", startDate: "", endDate: ""},
        resolver: zodResolver(NoteGetSchema)
    })

    const [notes, setNotes] = useState<Note[]>([])


    const filterNotes  = (data: NoteGetForm) => {
        const {text, startDate, endDate } = data
        try {
            axios.get(makeApiNoteRoute(), { params: {
                text: text || undefined, 
                startDate: startDate || undefined, 
                endDate: endDate || undefined
            }}).then((response) => {
                setNotes(response.data)
            })
        } catch(error) {
        }
    }

    const cleanFilter = async () => {
        try {
            axios.get(makeApiNoteRoute()).then((response) => {
                setNotes(response.data)
                reset()
            })
        } catch(error) {
        }
    }
     
    useEffect(() => {
        try {
            axios.get(makeApiNoteRoute()).then((response) => {
                setNotes(response.data)
            })
        } catch(error) {
        }
        
    }, [])

    return (
        <>       
            <Grid container spacing={2} rowSpacing={1} 
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                <TextField 
                    autoFocus
                    margin="dense"
                    id="text"
                    type="text"
                    fullWidth
                    sx={{width: '20%'}}
                    { ...register("text", {required: false})}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        autoFocus
                        { ...register("startDate")}
                        sx={{width: '10%'}}
                    />
                    <Typography> até </Typography>
                    <DatePicker
                        autoFocus
                        { ...register("endDate")}
                        sx={{width: '10%'}}
                    />
                </LocalizationProvider>

                <Button type="submit" onClick={ handleSubmit(filterNotes) } variant="outlined"> Filtrar </Button>
                <Button type="submit" onClick={ cleanFilter } variant="outlined"> Limpar filtro </Button>

                <NewNote></NewNote>
            </Grid>

            <br/>
            <br/>
            
            <NoteList notes={notes}/>
        </>
    )
}

export default Filter
