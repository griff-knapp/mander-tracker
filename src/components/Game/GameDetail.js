import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box, Select, Button } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Rating from '@mui/material/Rating';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { setGameDecks } from "../../api/UserQueries";
import { useAuth } from "../../contexts/Auth";
import { useHistory } from 'react-router';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

// const MenuProps = {
//     PaperProps: {
//         style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         },
//     },
// };

export function GameDetail(props) {
    const { gameName, gameLength, gameID, playerArray, funRating, winner, newGame, gameDate } = props;
    const [playerDecks, setPlayerDecks] = useState({});
    const { user } = useAuth();
    const history = useHistory();
    // const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);

    useEffect(() => {
        console.log(playerArray);
        playerArray.forEach(player => {
            setPlayerDecks(prev => ({...prev, [player.id]: player.decklist.find(deck => deck.did_play === true)?.name || '' }))
        });
        // console.log(user);
        // console.log(playerDecks);
        // console.log(gameLengthFormat(gameLength));
    },[playerArray]);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };
    
    console.log(gameName);

    const gameLengthFormat = (totalSeconds) => {
        const totalMinutes = Math.floor(totalSeconds / 60);

        // const seconds = totalSeconds % 60;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        console.log(hours);
        console.log(minutes);
        return (
            hours !== 0 ? 
                hours + 'hr' +
                (minutes !== 0 ? 
                    minutes + 'min'
                : '')
            :
                minutes + 'min'
        );
    }

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        console.log(gameID);
        const submitDecks = {...playerDecks, [`${id}`]: e.target.value};
        setPlayerDecks(submitDecks);
        try {
            await setGameDecks(submitDecks, gameID);
        } catch(err) { console.log(err) }
    }

    return (
        <Paper 
            sx={{
                p: 2,
                minHeight: '100%'
            }}
        >
            <Box sx={{ display: 'flex' }}>
                <Grid 
                    container
                    spacing={2}
                >
                    <Grid item xs={7} zeroMinWidth>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', overflowWrap: 'break-word' }}>{gameName}</Typography>
                        <Typography variant="subtitle1" >{gameLength ? gameLengthFormat(gameLength) : ''}</Typography>
                    </Grid>
                    <Grid item xs={5} zeroMinWidth>
                        <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'end', fontWeight: 'bold' }}>{gameDate ? gameDate.split(',')[0] : ''}</Typography>
                    </Grid>
                    <Grid item xs={12} zeroMinWidth>
                        <Typography component="legend">Players:</Typography>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                        <List sx={{ bgcolor: 'background.paper', width: '100%' }}>
                            {playerArray !== undefined && Object.keys(playerDecks).length !== 0 && user && playerArray.map(player => (
                                <ListItem key={player.name} sx={{ justifyContent: 'flex-start', p: 0, ml: 1, width: '100%', alignItems: 'start', mb: 1.5 }}>
                                    <ListItemAvatar>
                                        {winner === player.name && 
                                            <FontAwesomeIcon style={{ color: 'gold', position: 'absolute', zIndex: '10000', top: -5 }} icon={faCrown} />
                                        } 
                                        <Avatar>
                                            <AccountCircleIcon sx={{ fontSize: '2.5rem' }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <div style={{ display: 'block', width: '30%' }}>
                                        <Typography variant="h5" style={{ marginBottom: 10, fontWeight: 450, width: '200%' }}>
                                            {player.name}
                                        </Typography>
                                        {
                                            !newGame 
                                            // && 
                                            // user.id === player.info.id 
                                        ? 
                                            <Select
                                                sx={{ width: '200%' }}
                                                value={playerDecks[player.id]}
                                                label='Commander'
                                                onChange={(e) => {
                                                    handleSubmit(e, player.id);
                                                }}
                                            >
                                                {player.decklist && player.decklist.map(deck => (
                                                    <MenuItem key={deck.name} id={`commander${player.id}`} value={deck.name}>
                                                        {/* <ListItemText primary={deck.name} id={`commander${player.info.id}`}/> */}
                                                        {`${deck.name} - ${deck.commander}`}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        :
                                            (!newGame && user.id !== player.id && player.decklist.find(deck => deck.did_play === true) !== undefined) ?
                                                <>
                                                    <Typography sx={{ ml: 1 }} variant="h6">Commander:</Typography>
                                                    <Typography sx={{ ml: 1 }}>{player.info.decklist.find(deck => deck.did_play === true).name}</Typography>
                                                </>
                                                
                                        :
                                            null
                                        }
                                        
                                        {/* </TextField> */}
                                        {/* <Button
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            color="secondary"
                                            style={{ marginLeft: '-8px'}}
                                        >
                                            Commander:
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                            }}
                                        >    */}
                                            {/* {player.info.decklist.map(deck => {
                                                <MenuItem>HI</MenuItem>
                                            })} */}

                                            

                                            {/* <MenuItem onClick={handleClose}>Placeholder</MenuItem> */}
                                            {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                                            <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                                        {/* </Menu> */}
                                    </div>
                                    
                                    {/* <ListItemText primary={player.info.name} secondary="Commander: " sx={{ width: '25%' }}/> */}
                                </ListItem>
                            ))}
                            
                        </List>
                        </Box>
                    </Grid>
                    <Grid item xs={12} zeroMinWidth>
                        <Rating 
                            value={+funRating}
                            readOnly
                            precision={0.5}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={() => history.push('/')}>Back</Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}