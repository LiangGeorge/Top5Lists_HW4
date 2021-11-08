import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    function handleDeleteMarkedList(){
        store.deleteMarkedList();
        store.unmarkListForDeletion();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>


            <Modal
                aria-describedby="modal-modal-description"
                open={store.listMarkedForDeletion}
                className={"modal " + ((store.listMarkedForDeletion)? "is-visible": "")}
                >
                    
                <Box sx = {style}>
                    
                    <Typography id="modal-modal-description" align="center"sx={{ mt: 2}}>
                    {"Delete the Top 5 " + (store.listMarkedForDeletion? store.listMarkedForDeletion.name: "")+ " List?"}
                    </Typography>
                    <Stack direction="row" alignItems="stretch" spacing={3} sx = {{ ml: 13}}>
                    <Button 
                        onClick={() => handleDeleteMarkedList()}
                        size="small"
                        
                        variant="contained" color="error">Confirm</Button>
                        <Button 
                        onClick={() => store.unmarkListForDeletion()}
                        style={{ "min-height": "10px"}}
                        size="small"
                        variant="contained">Cancel</Button>
                        
                    </Stack>
                    
                </Box>
            </Modal>


                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;