import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box, Button } from "@mui/material";
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Rating from '@mui/material/Rating';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { setGameDecks } from "../../api/UserQueries";
import { useAuth } from "../../contexts/Auth";
import { useHistory } from 'react-router';
import { PlayerCard } from "./PlayerCard";

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
    const { gameName, gameLength, gameID, playerArray, funRating, winner, gameDate, guestArray, refreshData } = props;
    const [playerDecks, setPlayerDecks] = useState({});
    const { user } = useAuth();
    const history = useHistory();
    // const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);

    useEffect(() => {
        // console.log(podUUID.slice(1));
        playerArray.forEach(player => {
            setPlayerDecks(prev => ({...prev, [player.id]: player.decklist.find(deck => deck.did_play === true)?.name || '' }))
        });
        // console.log(user);
        console.log(playerArray);
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

    const handleSubmit = async (deck, id) => {
        console.log(gameID);
        const submitDecks = {...playerDecks, [`${id}`]: deck};
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
                    {/* <Grid item xs={6} zeroMinWidth> */}
                        {/* <Typography component="legend">Players:</Typography> */}
                        {/* <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        > */}
                        {/* put code back here */}
                            {/* <PlayerCard /> */}
                        {/* </Box> */}
                    {/* </Grid> */}
                    {playerArray !== undefined && playerArray !== null && Object.keys(playerDecks).length !== 0 && user && playerArray.map(player => (
                        <Grid item xs={6} zeroMinWidth>
                            <PlayerCard name={player.name} decklist={player.decklist} winner={winner} playerID={player.id} handleChangeCommander={handleSubmit} refreshData={refreshData} />
                        </Grid>
                    ))}
                    {guestArray !== undefined && guestArray !== null && user && guestArray.map(guest => (
                        <Grid item xs={6} zeroMinWidth>
                            <PlayerCard name={guest.name} winner={winner === null && guest.did_win ? guest.name : null} />
                        </Grid>
                    ))}
                    <Grid item xs={12} zeroMinWidth>
                        <Rating 
                            value={+funRating}
                            readOnly
                            precision={0.5}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            onClick={() => {
                                // console.log(history);
                                // history.push(history.location.pathname);
                                history.goBack();
                            }}>Back</Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}