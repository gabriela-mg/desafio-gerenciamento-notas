import { Button, Grid, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import type { NoteGetForm } from "../schema/noteGetSchema";
import NoteGetSchema from "../schema/noteGetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import NewNote from "./NewNote";
import NoteList from "./NoteList";
import dayjs from "dayjs";
import { useLazyGetNoteQuery, useLazyGetNotesByFilterQuery } from "../store/noteSlice";

function Filter() {

    const { register, handleSubmit, reset, control } = useForm<NoteGetForm>({
        defaultValues: {text: "", startDate: "", endDate: ""},
        resolver: zodResolver(NoteGetSchema)
    })

    const [triggerGetByFilter, { isFetching: isLoadingFilter }] = useLazyGetNotesByFilterQuery()
    const [triggerGetAll, { isFetching: isLoadingAll }] = useLazyGetNoteQuery()


    const filterNotes  = (data: NoteGetForm) => {
        const {text, startDate, endDate } = data
        try {
            console.log("oi")
            const params ={
                text: text || undefined, 
                startDate: startDate || undefined, 
                endDate: endDate || undefined
            }
            triggerGetByFilter(params)
        } catch(error) {
            console.log(error)
        }
    }

    const cleanFilter = async () => {
        try {
            console.log("ola")
            triggerGetAll(undefined)
            reset()
        } catch(error) {
            console.log(error)
        }
    }

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
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                        <DatePicker
                            {...field}
                            value={field.value ? dayjs(field.value) : null} // Ensure value is a Dayjs object or null
                            onChange={(date) => field.onChange(date ? date.toISOString() : null)} // Store as ISO string
                        />
                        )}
                    />
                    <Typography> até </Typography>
                     <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                        <DatePicker
                            {...field}
                            value={field.value ? dayjs(field.value) : null} // Ensure value is a Dayjs object or null
                            onChange={(date) => field.onChange(date ? date.toISOString() : null)} // Store as ISO string
                        />
                        )}
                    />
                </LocalizationProvider>

                <Button type="submit" onClick={ handleSubmit(filterNotes) } variant="outlined"> Filtrar </Button>
                <Button type="submit" onClick={ cleanFilter } variant="outlined"> Limpar filtro </Button>

                <NewNote></NewNote>
            </Grid>

            <br/>
            <br/>
            
            <NoteList/>
        </>
    )
}

export default Filter
