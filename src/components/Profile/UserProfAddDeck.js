import { useState } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Grid, Paper, Toolbar, Typography } from "@mui/material";
import { addDeck } from "../../api/UserQueries";
import { useAuth } from "../../contexts/Auth";
import { useHistory } from "react-router-dom";

export function CreateDeck({setAddDeckFilter}) {
    const [deckName, setDeckName] = useState('');
    const [commander, setCommander] = useState('');
    const { user } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAddDeckFilter(false)
        const response = await addDeck(deckName, commander, user.id);
        console.log(response);
    }

    return (
        // <Box
        //   component="main"
        //   sx={{
        //     flexGrow: 1,
        //     height: '100vh',
        //     overflow: 'auto',
        //   }}
        // >
        //     <Toolbar />
        //     <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', flexWrap: 'wrap' }}>
        //         <Grid container spacing={3}>
                    <Grid item xs={12} md={6} sx={{ flexGrow: 1 }}>
                        <Typography variant='h5' sx={{ mb: 0.5, mt:"10px"}}>Add Deck</Typography>
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
                                            onChange={(e) => setDeckName(e.target.value)}
                                        />
                                        <TextField
                                            id="outlined-name"
                                            label="Commander"
                                            value={commander}
                                            onChange={(e) => setCommander(e.target.value)}
                                        />
                                     
                                    </Grid>
                                </Grid>
                                <Button sx={{ marginTop: 2, marginLeft: 1 }} variant="contained" color="secondary" type="submit">Submit</Button>
                            </Box>
                        </Paper>
                    </Grid>
        //         </Grid>
        //     </Container>
        // </Box>
    );
}