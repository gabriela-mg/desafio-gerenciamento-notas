import { Button, Grid, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import type { NoteGetForm } from "../schema/noteGetSchema";
import NoteGetSchema from "../schema/noteGetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import NewNote from "./NewNote";
import dayjs from "dayjs";
import { useLazyGetNotesQuery } from "../store/noteApi";
import { ImageProvider } from "../contexts/ImageContext";

function Filter() {

    const { register, handleSubmit, reset, control } = useForm<NoteGetForm>({
        defaultValues: {text: "", startDate: "", endDate: ""},
        resolver: zodResolver(NoteGetSchema)
    })

    const [triggerGetAll, { isFetching, error}] = useLazyGetNotesQuery()

    const filterNotes  = (data: NoteGetForm) => {
        const {text, startDate, endDate } = data
        try {
            const params ={
                text: text || undefined, 
                startDate: startDate || undefined, 
                endDate: endDate || undefined
            }
            triggerGetAll(params)
        } catch(error) {
            console.log(error)
        }
    }

    const cleanFilter = async () => {
        try {
            triggerGetAll(undefined)
            reset()
        } catch(error) {
            console.log(error)
        }
    }

    if(isFetching) {
        <Typography> Carregando</Typography>
    }

    if(error) {
        <Typography color="red"> Erro </Typography>
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
                            value={field.value ? dayjs(field.value) : null} 
                            onChange={(date) => field.onChange(date ? date.toISOString() : null)} 
                            format="DD/MM/YYYY"
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
                            value={field.value ? dayjs(field.value) : null} 
                            onChange={(date) => field.onChange(date ? date.toISOString() : null)}
                            format="DD/MM/YYYY" 
                        />
                        )}
                    />
                </LocalizationProvider>

                <Button type="submit" onClick={ handleSubmit(filterNotes) } variant="outlined"> Filtrar </Button>
                <Button type="submit" onClick={ cleanFilter } variant="outlined"> Limpar filtro </Button>

                        <NewNote/>
            </Grid>

            <br/>
            <br/>
                    </>
    )
}

export default Filter
