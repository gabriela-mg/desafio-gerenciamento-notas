import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import './App.css'
import * as React from 'react';
import { useState, useEffect } from 'react';
import NewNote from './NewNote';

function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:5173/notes');
        const result = await response.json();
        setData(result);
        setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  fetchData();
  }, []);


  return (
    <>
      <h1>SUAS NOTAS</h1>
      <NewNote></NewNote>
      <br/>
      <label>Pesquisar nota</label>
      <br/>
      <input type="text"></input>
      <input type="date"></input>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <List>
          {data.map((note) => (
            <ListItem>
              <ListItemText
                primary={note.title}
                secondary= {note.description}
              />
              <ListItemButton>
                <ListItemText primary="Ver mais" />
              </ListItemButton>
            </ListItem>
          ))}
          
        </List>
      )}
      <br/>
    </>
  )
}

export default App
