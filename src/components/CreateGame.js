import { useState, useEffect } from "react";
import { useHistory } from 'react-router';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button, Container, Grid, Paper, Toolbar } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';

import Select from 'react-select';

import { addGame, getUsers } from "../api/UserQueries";

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

export function CreateGame() {
    const [gameName, setGameName] = useState('');
    const [playerData, setPlayerData] = useState([]);
    const [playerItems, setPlayerItems] = useState([]);
    const [duration, setDuration] = useState(0);
    const [funRating, setFunRating] = useState(null);
    const [winner, setWinner] = useState('');

    const history = useHistory();

    const handleAddGame = () => {
        
    }

    useEffect(() => {
        console.log('sup');
        const getData = async () => {
          try {
            const users = await getUsers();
            if (users) {
              console.log(users);
              setPlayerData(users.map(user => {
                return {
                    name: user.name,
                    id: user.id
                };
              }));
            }
          } catch(err) {
            console.log(err);
          }
        }
        getData();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const playerCount = playerItems.length;
        const winnerPlayer = playerData.find(player => player.name === winner).id;
        const userGameArray = playerData.map(player => {
            return {
                user_ref: player.id,
                stats: {
                    "death_source": null, 
                    "salt_meter": null,
                    "mana_flooded": false,
                    "mana_screwed": false
                }
            }
        });

        console.log(winnerPlayer);

        try {
            const response = await addGame(gameName, playerCount, winnerPlayer, 3600, null, null, Array(0), userGameArray);
            console.log(response);
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
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
                                            required
                                            id="outlined-name"
                                            label="Name"
                                            value={gameName}
                                            onChange={(e) => setGameName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="outlined-players"
                                            select
                                            SelectProps={{
                                                multiple: true,
                                                MenuProps: MenuProps,
                                                renderValue: (selected) => selected.join(', ')
                                            }}
                                            label="Players"
                                            value={playerItems}
                                            onChange={(e) => {
                                                const {
                                                    target: { value },
                                                  } = e;
                                                console.log(value);
                                                setPlayerItems(typeof value === 'string' ? value.split(',') : value,);
                                            }}
                                        >
                                            {playerData.map(player => (
                                                <MenuItem key={player.id} value={player.name}>
                                                    <Checkbox checked={playerItems.indexOf(player.name) > -1} />
                                                    <ListItemText primary={player.name} />
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                                required
                                                id="outlined-players"
                                                select
                                                SelectProps={{
                                                    MenuProps: MenuProps,
                                                    disabled: playerItems.length === 0
                                                }}
                                                label={playerItems.length === 0 ? "Select players for your game" : "Winner"}
                                                value={winner}
                                                onChange={(e) => {
                                                    console.log(playerItems);
                                                    setWinner(e.target.value);
                                                }}
                                        >
                                            {(playerItems.length === 0 ? ['Select players for your game'] : playerItems).map(name => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Button sx={{ marginTop: 2, marginLeft: 1 }} variant="contained" color="primary" type="submit">Submit</Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}