import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { getDecklist } from "../../api/UserQueries";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import { Container, Grid, Paper, Toolbar, Box } from "@mui/material";

export function Decklist() {
    const [decklist, setDecklist] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const getData = async () => {
            const decklistData = await getDecklist(user.id);
            console.log(decklistData);

            setDecklist(decklistData.map(deck => ({...deck, created_at: new Date(deck.created_at).toLocaleString()})));
        }
        if (user !== null) { 
            getData();
        }
    },[user]);

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
                    <Grid item xs={12}>
                        {/* <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        > */}
                            {/* <Box
                                // component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                            > */}
                                <TableContainer component={Paper} sx={{ borderColor: '#0B2447' }}>
                                    <Table sx={{ borderColor: '#0B2447' }}>
                                        <TableHead sx={{ borderColor: '#0B2447' }}>
                                            <TableRow sx={{ borderColor: '#0B2447' }}>
                                                <TableCell sx={{ borderColor: '#102A43', fontSize: '1em' }}>Name</TableCell>
                                                <TableCell sx={{ borderColor: '#102A43', fontSize: '1em' }}>Commander</TableCell>
                                                <TableCell sx={{ borderColor: '#102A43', fontSize: '1em' }} align="right">Date Added</TableCell>
                                            </TableRow> 
                                        </TableHead>
                                        <TableBody>
                                            {decklist !== null && decklist.map(deck => (
                                                <TableRow key={deck.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell sx={{ borderColor: '#102A43', fontSize: '1.5em', color: '#fff' }} component="th" scope="row">{deck.name}</TableCell>
                                                    <TableCell sx={{ borderColor: '#102A43', fontSize: '1.5em', color: '#fff' }} component="th" scope="row">{deck.commander}</TableCell>
                                                    <TableCell align="right" sx={{ borderColor: '#0B2447', fontSize: '1.15em', color: '#fff' }}>{deck.created_at}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            {/* </Box> */}
                        {/* </Paper> */}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}