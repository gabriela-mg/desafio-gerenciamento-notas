
import './App.css'

import { Route, Routes } from 'react-router';
import NoteCard from './NoteCard.tsx';
import Home from './Home.tsx';

function App() {        
    return (    
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/note/:id" element={<NoteCard />}/>
        </Routes>
    )
}

export default App