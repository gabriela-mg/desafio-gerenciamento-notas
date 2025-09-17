
import './App.css'

import { Route, Routes } from 'react-router';
import Note from './Note.tsx';
import Home from './Home.tsx';

function App() {        
    return (    
        <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/note/:id" element={<Note />}/>
        </Routes>
    )
}

export default App