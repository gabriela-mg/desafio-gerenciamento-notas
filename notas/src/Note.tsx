import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

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
         <ListItemButton>
            <ListItemText primary="Ver mais" />
         </ListItemButton>
      </List>
    </>
  )
}

export default Note;
