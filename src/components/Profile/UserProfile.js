import { useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import { getUser } from "../../api/UserQueries";

import { Container, Grid, Paper, Toolbar, Box, Typography } from "@mui/material";

export function UserProfile() {
    // const [data, setData] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const getData = async () => {
            const userData = await getUser(user.email);
            console.log(userData[0]);

            // setData(userData[0]);
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
                        <Typography variant='h5' sx={{ mb: 0.5 }}>Info</Typography>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                            >
                            
                        </Paper>
                            {/* <Box
                                // component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                            > */}
                                {/* <TableContainer component={Paper} sx={{ borderColor: '#0B2447' }}>
                                    <Table sx={{ borderColor: '#0B2447' }}>
                                        <TableHead sx={{ borderColor: '#0B2447' }}>
                                            <TableRow sx={{ borderColor: '#0B2447' }}>
                                                <TableCell sx={{ borderColor: '#102A43', fontSize: '1em' }}>Name</TableCell>
                                                <TableCell sx={{ borderColor: '#102A43', fontSize: '1em' }}>Commander</TableCell>
                                            </TableRow> 
                                        </TableHead>
                                        <TableBody>
                                            {data !== null && data.decklist.map(deck => (
                                                <TableRow key={deck.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell sx={{ borderColor: '#102A43', fontSize: '1.25em', color: '#fff' }} component="th" scope="row">{deck.name}</TableCell>
                                                    <TableCell sx={{ borderColor: '#102A43', fontSize: '1.25em', color: '#fff' }} component="th" scope="row">{deck.commander}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer> */}
                            {/* </Box> */}
                        {/* </Paper> */}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}