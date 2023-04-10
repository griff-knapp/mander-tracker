import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { CardActionArea } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

import { getGames } from "../api/UserQueries";

import { useHistory } from 'react-router-dom';

export default function GameContainer() {
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popText, setPopText] = useState('');

    const handlePopoverOpen = (event) => {
        // console.log(event.currentTarget.id);
        setAnchorEl(event.currentTarget);
        setPopText(event.currentTarget.id);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const getData = async () => {
            try {
              const result = await getGames();
              if (result !== undefined) {
                const updatedGameArray = result[0].data.map(game => {
                    const gameDate = new Date(game.created_at).toLocaleString();
                    return {
                        ...game, created_at: gameDate,
                    }
                });
                updatedGameArray.sort(function(a,b){
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(a.created_at) - new Date(b.created_at);
                });
                setData(updatedGameArray);
              }
            } catch(err) {
              console.log(err);
            }
        }
        getData();
    },[]);

    const history = useHistory();

    const handleAddGame = () => {
        history.push('/new-game');
    }

    const handleViewGame = (uuid) => {
        history.push('/game:'+uuid);
    }

    const handleChangePage = (event, value) => {
        setPage(value);
        // setPageCount(data !== null && Math.ceil(data.length/3));
    };

    const open = Boolean(anchorEl);

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

    return (
        <>  
            {data === null && 
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress />
                </Box>
        }
            {data !== null &&
                    <Grid container spacing={2.5} sx={{}}>
                        {data.slice((page - 1) * 3, (page * 3)).map(guy => (
                        <Grid item xs={12} lg={4} key={guy.name}>
                            <Card>
                                <CardActionArea onClick={() => handleViewGame(guy.uuid)}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {guy.created_at}
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            id={guy.name}
                                            onMouseEnter={handlePopoverOpen}
                                            onMouseLeave={handlePopoverClose}
                                        >
                                            {guy.name.length > 15 ? guy.name.slice(0, 15) + '...' : guy.name}
                                        </Typography>
                                        {guy.name.length > 15 &&
                                            <Popover
                                                id="mouse-over-popover"
                                                sx={{
                                                    pointerEvents: 'none',
                                                    boxShadow: 'none',
                                                    
                                                }}
                                                open={open}
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                                }}
                                                transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                                }}
                                                onClose={handlePopoverClose}
                                                disableRestoreFocus
                                                elevation={2}
                                            >
                                                <Typography sx={{ p: 1, backgroundColor: '#9FB3C8', color: '#102A43' }}>{popText}</Typography>
                                            </Popover>
                                        }
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            <FontAwesomeIcon style={{ color: 'gold' }} icon={faCrown} />{' '+guy.winner}
                                        </Typography>
                                        <Typography variant="body2" component="span" sx={{ fontWeight: 'bold'}}>
                                            Players:
                                        </Typography>
                                        <Typography variant="body2" component="span">
                                            {' ' + guy.player_count}
                                        </Typography>
                                        <Typography variant="body2" component="span" sx={{ marginLeft: 3, fontWeight: 'bold'}}>
                                            Length:
                                        </Typography>
                                        <Typography variant="body2" component="span">
                                            {' ' + gameLengthFormat(guy.duration)}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
            }
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Stack spacing={2} sx={{ marginTop: 2 }}>
                    <Pagination count={data !== null ? Math.ceil(data.length/3) : 1} page={page} onChange={handleChangePage} />
                </Stack>
                <Button sx={{ marginTop: 2 }} variant='contained' color="secondary" onClick={handleAddGame}>+ Game</Button>
            </div>
        </>
            
    );
}