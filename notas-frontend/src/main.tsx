import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { ImageProvider } from './contexts/ImageContext.tsx'


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ImageProvider>
                <App/>
            </ImageProvider>
        </BrowserRouter>
    </Provider>
)
