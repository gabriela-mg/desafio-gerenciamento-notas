import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            light: '#bd424eff',
            main: '#c4071b',
            dark: '#c4071b',
            contrastText: '#ffffffff',
        },
        secondary: {
            light: '#aa9191ff',
            main: '#ed4545',
            dark: '#741313ff',
            contrastText: '#000',
        },
        background: {
            default: '#d8b8b8ff'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#bd424eff',
                    color: '#ffffffff',
                    '&:hover': {
                        backgroundColor: '#741313ff', 
                    },
                },
                contained: {
                    backgroundColor: '#C70039',
                    color: '#ffffffff',
                },
                    outlined: {
                    borderColor: '#900C3F', 
                    color: '#ffffffff',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    backgroundColor: "#aa9191ff"
                }
            }
        },   
    }
})

