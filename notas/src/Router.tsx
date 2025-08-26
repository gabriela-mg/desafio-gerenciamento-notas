import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Note from './Note';
import * as React from 'react';

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