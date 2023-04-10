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
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import { addUser } from '../api/UserQueries';

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

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picture, setPicture] = useState('');
  const { signUp } = useAuth();

  const history = useHistory();

  useEffect(() => {
    const pics = [ image1, image2, image3, image4, image5, image6, image7, image8 ];
    const randomPic = Math.floor(Math.random() * pics.length);
    console.log(pics[randomPic]);
    setPicture(pics[randomPic]);
  },[]);
  
  const handleSubmit = async (e) => {
    // stuff
    e.preventDefault();
    const { error } = await signUp({ email, password });
    const response = await addUser(name, email);
    console.log(response);
    if (error) { 
      alert('error signing in');
      console.log(error);
    } else {
      history.push('/')
    }
  }

  return (
    picture !== '' &&
    
    
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
            // backgroundColor: (t) =>
            //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: `calc(100vw + 48px)`,
          }}
          style={{ backgroundImage: 'url(' + picture + ')' }}
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
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                disabled={password === '' || email === ''}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <span>Already have an account?</span>
                  <Link style={{ marginLeft: '10px' }} to="/login">Log In</Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    // <>
    //   <FormControl>
    //     <TextField
    //       label="Email"
    //       type="email"
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
    //     <Button variant="contained" disabled={password === '' || email === ''} onClick={handleSubmit}>Sign up</Button>
    //   </FormControl>
    //   <p>
    //     Already have an epic account? <Link to="/login">Log In</Link>
    //   </p>
    // </>
  );
}