import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import * as React from 'react';

function Note() {
      return (
    <>
      <List>
        <ListItem>
          <ListItemText
            primary="Nota"
            secondary= 'Descrição'
          />
        </ListItem>         
      </List>
    </>
  )
}

export default Note;
