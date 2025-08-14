import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import Note from './Note.tsx';

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/nota" element={<Note />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router;