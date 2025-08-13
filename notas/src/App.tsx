//import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';


import './App.css'

function App() {
 // const [count, setCount] = useState(0)

  return (
    <>
      <h1>SUAS NOTAS</h1>
      <button>Adicionar</button>
      <br/>
      <label>Pesquisar nota</label>
      <br/>
      <input type="text"></input>
      <input type="date"></input>

      <List>
        <ListItem>
          <ListItemText
            primary="Nota"
            secondary= 'Descrição'
          />
        </ListItem>,
         <ListItemButton>
            <ListItemText primary="Ver mais" />
         </ListItemButton>
      </List>
    </>
  )
}

export default App
