import { Button, Grid, Input, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Notes from "./Notes";
import NewNote from "./NewNote";

export type Note = {
    id: number,
    title: string,
    description: string,
    date: string
}

function Filter() {

    const [text, setText] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [notes, setNotes] = useState<Note[]>([])

    const handleTextChange = (e: any) => {
        setText(e.target.value);
    };
  
    const handleStartDateChange = (e: any) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: any) => {
        setEndDate(e.target.value);
    };

    const filterNotes = async () => {
        try {
            await axios.get('http://localhost:3000/api/note', { params: { startDate: startDate, text: text, endDate: endDate }}).then((response) => {
                setNotes(response.data)
                console.log(text)
            })
        } catch(error) {
        }
    }

    const cleanFilter = async () => {
        try {
            axios.get('http://localhost:3000/api/note').then((response) => {
                setStartDate("")
                setEndDate("")
                setText("")
                setNotes(response.data)
            })
        } catch(error) {
        }
    }
     
    useEffect(() => {
        try {
            axios.get('http://localhost:3000/api/note').then((response) => {
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
                <Input 
                    autoFocus
                    required
                    margin="dense"
                    id="text"
                    name="text"
                    type="text"
                    fullWidth
                    value={ text }
                    onChange={ handleTextChange }
                    sx={{width: '20%'}}
                />
                <Input
                    autoFocus
                    required
                    margin="dense"
                    id="date"
                    name="date"
                    type="date"
                    fullWidth
                    value={ startDate}
                    onChange={ handleStartDateChange }
                    sx={{width: '10%'}}
                />
                <Typography> até </Typography>
                <Input
                    autoFocus
                    required
                    margin="dense"
                    id="date"
                    name="date"
                    type="date"
                    fullWidth
                    value={ endDate }
                    onChange={ handleEndDateChange }
                    sx={{width: '10%'}}
                />
                <Button type="submit" onClick={ filterNotes } variant="outlined"> Filtrar </Button>
                <Button type="submit" onClick={ cleanFilter } variant="outlined"> Limpar filtro </Button>

                <NewNote></NewNote>
            </Grid>

            <br/>
            <br/>
            
            <Notes notes={notes}/>
        </>
    )
}

export default Filter
