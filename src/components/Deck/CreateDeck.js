import { useState } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Grid, Paper, Toolbar, Typography } from "@mui/material";
import { addDeck } from "../../api/UserQueries";
import { useAuth } from "../../contexts/Auth";
import { useHistory } from "react-router-dom";

export function CreateDeck() {
    const [deckName, setDeckName] = useState('');
    const [commander, setCommander] = useState('');
    // const [commanderOptions, setCommanderOptions] = useState([]);
    const { user } = useAuth();
    const history = useHistory();

    // useEffect(() => {
    //     console.log(session);
    //     const getInitialCardData = async() => {
    //         let response = await fetch('https://api.scryfall.com/cards/search?q=a', {
    //             method: 'GET',
    //             mode: 'cors',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });
    //         response = await response.json();
    //         if (response.object && response.object === 'list') {
    //             setCommanderOptions(response.data.map(card => card.name));
    //         }
    //     }
    //    getInitialCardData();
    // },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await addDeck(deckName, commander, user.id);
        history.push('/decklist');
        console.log(response);
    }

    // const handleSearchScryfall = async (e) => {
    //     // format - object.data.map(card => name)
    //     let manderOptions = null;
    //     try {
    //         let response = await fetch(`https://api.scryfall.com/cards/search?q=${e.target.value}`,{
    //             method: 'GET',
    //             mode: 'cors',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });
    //         response = await response.json();

    //         if (response.object === 'list') {
    //             manderOptions = response.data.map(card => card.name);
    //         }

    //     } catch(err) {
    //         console.log(err);
    //     };
        
    //     return manderOptions;
    // }

    // const handleChange = async (e) => {
    //     setDeckName(e.target.value);
    //     console.log(e.target.value);
    //     const scryResponse = await handleSearchScryfall(e);
    //     setCommanderOptions(scryResponse);
    // }

    return (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', flexWrap: 'wrap' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} sx={{ flexGrow: 1 }}>
                        <Typography variant='h5' sx={{ mb: 0.5 }}>Add Deck</Typography>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                            >
                                <Grid container spacing={2.5}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-name"
                                            label="Name"
                                            value={deckName}
                                            // inputProps={{ maxlength: '19' }}
                                            onChange={(e) => setDeckName(e.target.value)}
                                        />
                                        <TextField
                                            id="outlined-name"
                                            label="Commander"
                                            value={commander}
                                            // inputProps={{ maxlength: '19' }}
                                            onChange={(e) => setCommander(e.target.value)}
                                        />
                                        {/* <Autocomplete
                                            disablePortal
                                            id="mander-box"
                                            options={commanderOptions}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Card" />}
                                            inputValue={deckName}
                                            onInputChange={handleChange}
                                        /> */}
                                    </Grid>
                                </Grid>
                                <Button sx={{ marginTop: 2, marginLeft: 1 }} variant="contained" color="secondary" type="submit">Submit</Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}