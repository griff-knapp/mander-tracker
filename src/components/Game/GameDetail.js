import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box, Select } from "@mui/material";
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
    const { gameName, gameID, playerArray, funRating, winner } = props;
    const [playerDecks, setPlayerDecks] = useState({});
    // const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);

    useEffect(() => {
        playerArray.forEach(player => {
            
            setPlayerDecks(prev => ({...prev, [player.info.id]: player.info.decklist.find(deck => deck.did_play === true)?.name || '' }))
        });
        // console.log(playerDecks);
    },[playerArray]);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };
    
    console.log(gameName);

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
                    <Grid item xs={5} zeroMinWidth>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', overflowWrap: 'break-word' }}>{gameName}</Typography>
                    </Grid>
                    <Grid item xs={7} zeroMinWidth>
                        <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'end', fontWeight: 'bold' }}>12/19/2022</Typography>
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
                            {playerArray !== undefined && Object.keys(playerDecks).length !== 0 && playerArray.map(player => (
                                <ListItem key={player.info.name} sx={{ justifyContent: 'flex-start', p: 0, ml: 1, width: '100%', alignItems: 'start', mb: 1.5 }}>
                                    <ListItemAvatar>
                                        {winner === player.info.name && 
                                            <FontAwesomeIcon style={{ color: 'gold', position: 'absolute', zIndex: '10000', bottom: 80 }} icon={faCrown} />
                                        } 
                                        <Avatar>
                                            <AccountCircleIcon sx={{ fontSize: '2.5rem' }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <div style={{ display: 'block', width: '30%' }}>
                                        <div style={{ marginBottom: 10 }}>
                                            {player.info.name}
                                        </div>
                                        {/* <TextField
                                            select
                                            sx={{ width: '100%' }}
                                            SelectProps={{
                                                MenuProps: MenuProps,
                                            }}
                                            label="Commander"
                                            // defaultValue={{deck: player.info.decklist.find(deck => deck.did_play === true)?.name || '', playerID: player.info.id}}
                                            value={Object.keys(playerDecks).length !== 0 ? playerDecks[player.info.id] : ''}
                                            onChange={(e) => {
                                                const {
                                                    target: { value },
                                                  } = e;
                                                console.log(value);
                                                handleSubmit(e);
                                                // setPlayerItems(typeof value === 'string' ? value.split(',') : value,);
                                            }}
                                            id={`commander${player.info.id}`}
                                        > */}
                                            <Select
                                                sx={{ width: '100%' }}
                                                value={playerDecks[player.info.id]}
                                                label='Commander'
                                                onChange={(e) => {
                                                    handleSubmit(e, player.info.id);
                                                }}
                                            >

                                            
                                            {/* {playerData.map(player => (
                                                <MenuItem key={player.id} value={player.name}>
                                                    <Checkbox checked={playerItems.indexOf(player.name) > -1} />
                                                    <ListItemText primary={player.name} />
                                                </MenuItem>
                                            ))} */}
                                            {player.info.decklist && player.info.decklist.map(deck => (
                                                <MenuItem key={deck.name} id={`commander${player.info.id}`} value={deck.name}>
                                                    {/* <ListItemText primary={deck.name} id={`commander${player.info.id}`}/> */}
                                                    {deck.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
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
                </Grid>
            </Box>
        </Paper>
    )
}