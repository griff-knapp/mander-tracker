import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom'; 

import { useAuth } from '../contexts/Auth';

// import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

import image1 from '../mtg-art/Bind-the-Monster-Kaldheim-MtG-Art.jpg';
import image2 from '../mtg-art/Doomskar-Kaldheim-MtG-Art.jpg';
import image3 from '../mtg-art/Grim-Draugr-Kaldheim-MtG-Art.jpg';
import image4 from '../mtg-art/Inga-Rune-Eyes-Variant-Kaldheim-MtG-Art.jpg';
import image5 from '../mtg-art/Plains-Variant-Kaldheim-MtG-Art.jpg';
import image6 from '../mtg-art/Ranar-the-Ever-Watchful-Box-Art.jpg';
import image7 from '../mtg-art/Shard-Token-Kaldheim-MtG-Art.jpg';
import image8 from '../mtg-art/Spectral-Deluge-Kaldheim-MtG-Art.jpg';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        The Northern Warriors
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { session, signIn } = useAuth();
  const [picture, setPicture] = useState('');
  // console.log(user);
  // const { signIn } = useAuth();

  // useEffect(() => {

  // },[]);
  useEffect(() => {
    const pics = [ image1, image2, image3, image4, image5, image6, image7, image8 ];
    const randomPic = Math.floor(Math.random() * pics.length);
    console.log(pics[randomPic]);
    setPicture(pics[randomPic]);
  },[]);

  const history = useHistory();

  if (session) {
    history.push('/');
  }
  
  const handleSubmit = async (e) => {
    // stuff
    e.preventDefault();
    const { error } = await signIn({ email, password });

    if (error) { 
      alert('error signing in');
      console.log(error);
    } else {
      history.push('/')
    }
  }

  return (
    <ThemeProvider>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(' + picture + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                disabled={password === '' || email === ''}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <span>Don't have an account?</span>
                  <Link style={{ marginLeft: '10px' }} to="/signup">Sign Up</Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    // <>
    //   <FormControl>
    //     <TextField
    //       label="Email"
    //       variant="outlined" 
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <TextField
    //       type="password"
    //       label="Password"
    //       variant="outlined"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <Button 
    //       variant="contained"
    //       disabled={password === '' || email === ''}
    //       onClick={handleSubmit}
    //     >
    //       Login
    //     </Button>
    //   </FormControl>
    //   <p>
    //     Don't have an epic account yet? <Link to="/signup">Sign Up</Link>
    //   </p>
    // </>
  );
}