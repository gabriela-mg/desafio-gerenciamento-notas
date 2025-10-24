import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { ImageProvider } from './contexts/ImageContext.tsx'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme.tsx'


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <ImageProvider>
                <App/>
            </ImageProvider>
        </BrowserRouter>
        </ThemeProvider>
    </Provider>
)
