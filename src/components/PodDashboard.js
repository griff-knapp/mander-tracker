import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import Leaderboard from './Leaderboard';
import GameContainer from './GameContainer';
import PodMemberListContainer from './PodMemberList/PodMemberListContainer';

// import { useEffect } from 'react';
// import { useAuth } from '../contexts/Auth';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

export function PodDashboard() {
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Typography variant='h5' sx={{ mb: 0.5 }}>Games</Typography>
                <GameContainer />
                <Typography variant='h5' sx={{ mb: 0.5 }}>Leaderboard</Typography>
                <Leaderboard />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Typography variant='h5' sx={{ mb: 0.5 }}>Pod Members</Typography>
                <PodMemberListContainer />
              </Grid>
              <Grid item xs={12}>
                
              </Grid>
            </Grid>
          </Container>
          <Toolbar />
        </Box>
  )
}