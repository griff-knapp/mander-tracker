import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getGames } from "../api/UserQueries";

export default function GameContainer() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
              const games = await getGames();
              if (games !== undefined) {
                console.log(games[0].data);
                setData(games[0].data);
              }
            } catch(err) {
              console.log(err);
            }
        }
        getData();
    },[]);

    return (
        <>
            {data !== null &&
                
                    <Grid container spacing={2.5}>
                        {data.map(guy => (
                        <Grid item xs={4}>
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {guy.created_at}
                                    </Typography>
                                    <Typography variant="h5">
                                        {guy.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {guy.winner}
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
                                        {' ' + (((parseInt(guy.duration) % 86400) & 3600) / 60) + 'min'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
            }
            
        </>
            
    );
}