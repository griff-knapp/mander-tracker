import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { CardActionArea } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

import { getGames, addGame } from "../api/UserQueries";

export default function GameContainer() {
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    // const [pageCount, setPageCount] = useState(1);
    // const [playerID1, setPlayerID1] = useState(null);
    // const [playerID2, setPlayerID2] = useState(null);
    // const [playerID3, setPlayerID3] = useState(null);
    // const [playerID4, setPlayerID4] = useState(null);
    // const [playerID5, setPlayerID5] = useState(null);

    const getData = async () => {
        try {
          const games = await getGames();
          if (games !== undefined) {
            console.log(games[0].data);
            setData([...games[0].data]);
          }
        } catch(err) {
          console.log(err);
        }
    }

    useEffect(() => {
        getData();
    },[]);

    const handleAddGame = async () => {
        // const gameObject = {
        //     name: 'Test 4',
        //     pcount: 1,
        //     winner: 1,
        //     duration: 2000,
        //     fun: funMeter,
        //     most_damage: mostDamage,
        //     knockout_order: koOrder
        // }
        const userGameArray = [
            {
                user_ref: 1,
                stats: {
                    "death_source": null, 
                    "salt_meter": null,
                    "mana_flooded": false,
                    "mana_screwed": false
                }
            }
        ];
        const response = await addGame('Test ' + Math.random(), 1, 1, 2000, null, null, Array(0), userGameArray);
        console.log(response);
        getData();
    }

    const handleChangePage = (event, value) => {
        setPage(value);
        // setPageCount(data !== null && Math.ceil(data.length/3));
    };

    return (
        <>
            {data !== null &&
                
                    <Grid container spacing={2.5}>
                        {data.slice((page - 1) * 3, page * 3).map(guy => (
                        <Grid item xs={4} key={guy.name}>
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {guy.created_at}
                                    </Typography>
                                    <Typography variant="h5">
                                        {guy.name}
                                    </Typography>
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
                                        {' ' + Math.ceil(((parseInt(guy.duration) % 86400) & 3600) / 60) + 'min'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
            }
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Stack spacing={2} sx={{ marginTop: 2 }}>
                    <Pagination count={data !== null ? Math.ceil(data.length/3) : 1} page={page} onChange={handleChangePage} color="primary" />
                </Stack>
                
                
                <Button sx={{ marginTop: 2 }} variant="contained" color="primary" onClick={handleAddGame}>+ Game</Button>
            </div>
            
            
        </>
            
    );
}