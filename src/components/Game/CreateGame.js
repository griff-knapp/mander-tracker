import { useState, useEffect } from "react";
import { useHistory } from 'react-router';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button, Container, Grid, Paper, Toolbar } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { addGame, getUsersByPod } from "../../api/UserQueries";
import { useParams } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

const timeValues = [
    {label: '15 min', value: 900},
    {label: '30 min', value: 1800},
    {label: '45 min', value: 2700},
    {label: '1 hr', value: 3600},
    {label: '1hr15 min', value: 4500},
    {label: '1hr30 min', value: 5400},
    {label: '1hr45 min', value: 6300},
    {label: '2 hr', value: 7200},
    {label: '2hr15 min', value: 8100},
    {label: '2hr30 min', value: 9000},
    {label: '2hr45 min', value: 9900},
    {label: '3 hr', value: 10800},
    'so long I wanted to die...'
]

export function CreateGame() {
    const [gameName, setGameName] = useState('');
    const [playerData, setPlayerData] = useState([]);
    const [playerItems, setPlayerItems] = useState([]);
    const [duration, setDuration] = useState('');
    const [funRating, setFunRating] = useState(0);
    const [winner, setWinner] = useState('');
    const [toggleAddGuest, setToggleAddGuest] = useState(false);
    const [guestName, setGuestName] = useState('');
    let { poduuid } = useParams();

    const history = useHistory();

    useEffect(() => {
        // console.log(poduuid);
        const getData = async () => {
          try {
            const users = await getUsersByPod(poduuid);
            if (users) {
              console.log(users);
              setPlayerData(users.map(user => {
                return {
                    name: user.name,
                    id: user.id,
                    decklist: user.decklist
                };
              }));
            }
          } catch(err) {
            console.log(err);
          }
        }
        getData();
    },[poduuid]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const playerCount = playerItems.length;

        let winnerPlayer = null;
        const winnerMatch = playerData.find(player => player.name === winner);
        if (winnerMatch !== undefined) {
            winnerPlayer = winnerMatch.id;
        } else {
            winnerPlayer = playerItems.find(player => player === winner);
        }


        let guestArray = [];

        let userGameArray = playerItems.map(player => {
            let playerId = null;
            for (const playerInfo in playerData) {
                if (playerData[playerInfo].name === player) {
                    playerId = playerData[playerInfo].id;
                }
            }

            console.log(playerId);

            if (playerId === null && typeof player === 'string') {
                console.log(player + ' is a guest!');
                const didWin = (typeof winnerPlayer === 'string' && winnerPlayer === player)
                guestArray = [...guestArray, { name: player, commander: null, did_win: didWin }];
                console.log(guestArray);
                return null;
            }

            return {
                user_ref: playerId,
                stats: {
                    "death_source": null, 
                    "salt_meter": null,
                    "mana_flooded": false,
                    "mana_screwed": false
                }
            }
        });
        userGameArray = userGameArray.filter(ug => ug !== null);
        console.log(userGameArray);
        
        try {
            const response = await addGame(gameName, playerCount, winnerPlayer, duration, funRating, null, Array(0), userGameArray, poduuid.slice(1), guestArray);
            console.log(response);
            history.push('/pod:'+poduuid.slice(1));
        } catch (err) {
            console.log(err);
        }
    }

    // const formatPlayerData = () => {
    //     const formattedArray = playerData.filter(player => playerItems.filter(player2 => player2 === player.name).length > 0).map(player3 => ({name: player3.name, id: player3.id, decklist: player3.decklist, stats: {}}));
    //     console.log(formattedArray);
    //     return formattedArray;
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
                    <Grid item xs={12} md={6}>
                        <Typography variant='h5' sx={{ mb: 0.5 }}>Add Game</Typography>
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
                                            style={{ width: '95%' }}
                                            value={gameName}
                                            // inputProps={{ maxlength: '19' }}
                                            onChange={(e) => setGameName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-players"
                                            style={{ width: '95%' }}
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
                                                // console.log(value);
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
                                    {!toggleAddGuest &&
                                        <Grid item xs={12}>
                                            <Button variant="outlined" color="secondary" sx={{ ml: 1 }} onClick={() => setToggleAddGuest(true)}>Add Guest</Button>
                                        </Grid>
                                    }
                                    {toggleAddGuest &&
                                        <>
                                        <Grid item xs={9}>
                                            <TextField
                                                label="Guest Name"
                                                style={{ width: '95%' }}
                                                value={guestName}
                                                // inputProps={{ maxlength: '19' }}
                                                onChange={(e) => setGuestName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                <Button 
                                                    color="secondary" 
                                                    variant="outlined" 
                                                    sx={{ my: 2, display: 'flex' }}
                                                    onClick={() => {
                                                        if (guestName !== '') {
                                                            setPlayerItems([...playerItems, guestName]);
                                                            setToggleAddGuest(false);
                                                            setGuestName('');
                                                        }
                                                    }}
                                                >
                                                    <CheckCircleIcon />
                                                </Button>
                                                <Button
                                                    color="secondary"
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ my: 2, display: 'flex' }}
                                                    onClick={() => {
                                                        setToggleAddGuest(false);
                                                        setGuestName('');
                                                    }}
                                                >
                                                    <CancelIcon />
                                                </Button>
                                            </div>
                                        </Grid>
                                        </>
                                        
                                    }
                                    
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                                id="outlined-players"
                                                select
                                                style={{ width: '95%' }}
                                                SelectProps={{
                                                    MenuProps: MenuProps,
                                                    disabled: playerItems.length === 0,
                                                }}
                                                label={playerItems.length === 0 ? "Select players for your game" : "Winner"}
                                                value={winner}
                                                onChange={(e) => {
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
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            select
                                            style={{ width: '95%' }}
                                            SelectProps={{
                                                MenuProps: MenuProps
                                            }}
                                            label={'Duration'}
                                            value={duration}
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                setDuration(e.target.value);
                                            }}
                                        >
                                            {timeValues.map(time => (
                                                <MenuItem key={time.label} value={time.value} style={{ whiteSpace: 'pre' }}>{time.label}</MenuItem>
                                            ))}
                                        </TextField>
                                        {/* <InputLabel>Duration</InputLabel>
                                        <Select
                                            label={'Duration'}
                                            sx={{width: '50%'}}
                                            value={duration}
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                setDuration(e.target.value);
                                            }}
                                        >
                                            {timeValues.map(time => (
                                                <MenuItem value={time}>{time}</MenuItem>
                                            ))}
                                        </Select> */}
                                    </Grid>
                                    <Grid item sx={{ marginLeft: 1 }} xs={12}>
                                        <Typography component="legend">Fun Rating</Typography>        
                                        <Rating 
                                            value={funRating}
                                            precision={0.5}
                                            onChange={(e) => setFunRating(+e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Button sx={{ marginTop: 2, marginLeft: 1 }} variant="contained" color="secondary" type="submit">Submit</Button>
                            </Box>
                        </Paper>
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                        <GameDetail gameName={gameName} gameLength={duration} playerArray={formatPlayerData()} funRating={funRating} winner={winner} newGame={true} />
                    </Grid> */}
                </Grid>
            </Container>
        </Box>
    );
}