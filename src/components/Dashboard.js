import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import Leaderboard from './Leaderboard';
import GameContainer from './GameContainer';
// import { useAuth } from '../contexts/Auth';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export function Dashboard() {
  // const { user } = useAuth();
  // console.log(user); 

  return (
        <Box
          component="main"
          sx={{
            // backgroundColor: (theme) =>
            //   theme.palette.mode === 'dark'
            //     ? theme.palette.primary
            //     : '#0B2447',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Typography variant='h5' sx={{ mb: 0.5 }}>Games</Typography>
                {/* <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                > */}
                  <GameContainer />
                {/* </Paper> */}
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Typography variant='h5' sx={{ mb: 0.5 }}>Grand Champ</Typography>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  {/* <Deposits /> */}
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Typography variant='h5' sx={{ mb: 0.5 }}>Leaderboard</Typography>
                {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> */}
                  <Leaderboard />
                {/* </Paper> */}
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
  )
}