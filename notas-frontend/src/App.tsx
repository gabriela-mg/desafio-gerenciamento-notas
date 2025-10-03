
import './App.css'

import { Route, Routes } from 'react-router';
import NoteCard from './pages/NoteCard.tsx';
<<<<<<< HEAD
import Home from './pages/Home.tsx';
=======
import Home from './Home.tsx';
>>>>>>> dev

function App() {        
    return (    
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/note/:id" element={<NoteCard />}/>
        </Routes>
    )
}

export default App