import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Rating from '@mui/material/Rating';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

export function GameDetail(props) {
    console.log(props);
    const { gameName, playerArray, funRating, winner } = props;
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
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'grey' }}>12/19/2022</Typography>
                    </Grid>
                    <Grid item xs={12} zeroMinWidth>
                        <Typography component="legend">Players:</Typography>  
                        <List sx={{ bgcolor: 'background.paper', width: '100%' }}>
                            {playerArray !== undefined && playerArray.map(player => (
                                <ListItem sx={{ justifyContent: 'flex-start', p: 0, ml: 1 }}>
                                    <ListItemAvatar>
                                        {winner === player.info.name && 
                                            <FontAwesomeIcon style={{ color: 'gold', position: 'absolute', zIndex: '10000', bottom: 40 }} icon={faCrown} />
                                        } 
                                        <Avatar>
                                            <AccountCircleIcon sx={{ fontSize: '2.5rem' }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={player.info.name} secondary="Commander: " sx={{ width: '25%' }}/>
                                </ListItem>
                            ))}
                            
                        </List>
                    </Grid>
                    <Grid item xs={12} zeroMinWidth>
                        <Rating 
                            value={funRating}
                            readOnly
                            precision={0.5}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}