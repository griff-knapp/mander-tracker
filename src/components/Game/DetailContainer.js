import Box from '@mui/material/Box';
import { Container, Grid, Toolbar } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getGame } from '../../api/UserQueries';
import { useState } from 'react';
import { GameDetail } from './GameDetail';

export function DetailContainer() {
    const [data, setData] = useState(null);
    let { uuid } = useParams();

    console.log(data !== null ? data.gameData.id : '');
    useEffect(() => {
        const getData = async () => {
            try {
                console.log(uuid.slice(1));
                const response = await getGame(uuid.slice(1));
                if (response) {
                    console.log(response);
                    setData(response);
                }
            } catch(err) {
              console.log(err);
            }
        }
        getData();
    },[uuid]);

    // const formatPlayerData = () => {
    //     const formattedArray = data.playerData.filter(player => ({info: {name: player.name, id: player.id, decklist: player.decklist}, stats: player.stats}));
    //     console.log(formattedArray);
    //     return formattedArray;
    // }

    return (
        <Box
            component="main"
            sx={{
            // backgroundColor: (theme) =>
            //     theme.palette.mode === 'light'
            //     ? theme.palette.grey[100]
            //     : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', flexWrap: 'wrap' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        {data !== null ? 
                            <GameDetail
                                gameName={data.gameData.name}
                                gameID={data.gameData.id}
                                playerArray={data.playerData}
                                funRating={data.gameData.stats.fun_meter === null ? 0 : data.gameData.stats.fun_meter}
                                winner={data.winnerData.name}
                                gameDate={new Date(data.gameData.created_at).toLocaleString()}
                                podUUID={uuid}
                            />
                        :   
                            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress />
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}