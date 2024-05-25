import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
} from '@mui/material';
import Wrapper from '../components/Wrapper';
import { getShoppingLists, postShoppingList } from '../api/getShoppingLists';
import ShoppingListCard from '../components/ShoppingListCard';

const ShoppingList = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState('');

  useEffect(() => {
    getShoppingLists()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setListName('');
  };

  const handleCreate = () => {
    const data = {
      user_id: 2,
      name: listName,
    };
    postShoppingList(data);
    handleClose();
    window.location.reload();
  };

  return (
    <Wrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
          Shopping lists
        </Typography>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            backgroundColor: '#8361F7',
            '&:hover': { backgroundColor: '#303f9f'},
            fontWeight: 'bold',
            padding: '10px 20px',
          }}
        >
          Create new shopping list
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Shopping List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of your new shopping list.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Shopping List Name"
            type="text"
            fullWidth
            variant="standard"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {data.map((list) => (
        <ShoppingListCard key={list.id} list={list} />
      ))}
    </Wrapper>
  );
};

export default ShoppingList;
