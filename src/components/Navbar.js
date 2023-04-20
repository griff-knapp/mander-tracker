// import { styled } from '@mui/material/styles';
// import MuiDrawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import SpeedDial from '@mui/material/SpeedDial';
// import SpeedDialIcon from '@mui/material/SpeedDialIcon';
// import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddCardIcon from '@mui/icons-material/AddCard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/Auth';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { createPod, getUserPods } from '../api/UserQueries';
import { Add } from '@mui/icons-material';
import { TextField } from '@mui/material';

// import logo from '../logo/logo.png';

// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
//   })(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//       marginLeft: drawerWidth,
//       width: `calc(100% - ${drawerWidth}px)`,
//       transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     }),
// }));

// const drawerWidth = 150;

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     '& .MuiDrawer-paper': {
//       position: 'relative',
//       whiteSpace: 'nowrap',
//       width: drawerWidth,
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       boxSizing: 'border-box',
//       ...(!open && {
//         overflowX: 'hidden',
//         transition: theme.transitions.create('width', {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.leavingScreen,
//         }),
//         width: theme.spacing(7),
//         [theme.breakpoints.up('sm')]: {
//           width: theme.spacing(9),
//         },
//       }),
//     },
//   }),
// );



// const pages = ['The Northern Boys', 'Climbing Wolf', 'Tarrytown Apt'];

export function Navbar() {
    const { signOut, session, user } = useAuth();
    // const [open, setOpen] = useState(false);
    // const [dialOpen, dialSetOpen] = useState(false);
    const [pods, setPods] = useState(null);
    const [editNewPod, setEditNewPod] = useState(false);
    const [newPodName, setNewPodName] = useState('');
    const [activePod, setActivePod] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const history = useHistory();
    
    useEffect(() => {
      const getData = async () => {
        if (user) {
          try {
            const response = await getUserPods(user.id);
            setPods(response);
          } catch (error) {
            console.log(error);
          }
        }
      }
      getData();

      if (localStorage.getItem('activePod') !== null) {
        setActivePod(localStorage.getItem('activePod'))
      }

      return () => {
        localStorage.removeItem('activePod');
      }
    }, [user]);

    

    const getPodData = async () => {
      if (user) {
        try {
          const response = await getUserPods(user.id);
          setPods(response);
        } catch (error) {
          console.log(error);
        }
      }
    }

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = (uuid) => {
      if (typeof uuid === 'string') {
        handleClickPod(uuid);
        setActivePod(uuid);
        localStorage.setItem('activePod', uuid);
      }
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    // const toggleDrawer = () => {
    //     setOpen(!open);
    // };
      
    // const handleSignout = async () => {
    //     await signOut();
    //     history.push('/login');
    // }
    
    // if user is not signed in dont show navbar
    if (session === null) {
        return null;
    }

    const handleClickPod = (uuid) => {
      if (typeof uuid === 'string') {
        history.push('/pod:'+uuid);
      }
    }

    const actions = [
      {
        icon: <AccountCircleIcon />,
        name: 'Profile',
        handleClick: () => {
          handleCloseUserMenu();
          localStorage.removeItem('activePod');
          setActivePod(null);
          history.push('/user-profile');
        }
      },
      {
        icon: <ViewCarouselIcon />,
        name: 'View Decks',
        handleClick: () => {
          handleCloseUserMenu();
          localStorage.removeItem('activePod');
          setActivePod(null);
          history.push('/decklist');
        }
      },
      { 
        icon: <AddCardIcon />,
        name: 'Add Deck',
        handleClick: () => {
          handleCloseUserMenu();
          localStorage.removeItem('activePod');
          setActivePod(null);
          history.push('/new-deck')
        }
      },
      { 
        icon: <ExitToAppIcon />,
        name: 'Sign Out',
        handleClick: async () => {
          setActivePod(null);
          localStorage.clear();
          await signOut();
          handleCloseUserMenu();
          history.push('/login');
        }
      },
    ];

    const handleCreateNewPod = async () => {
      if (newPodName !== '') {
        try {
          const response = await createPod(newPodName, user.id);
          if (response !== null) {
            setEditNewPod(false);
            setNewPodName('');
            getPodData();
            setActivePod(response[0].uuid);
            localStorage.setItem('activePod', activePod);
            history.push('/pod:'+response[0].uuid);
          } else {
            setNewPodName('');
            setEditNewPod(true);
          }
        } catch (error) {
          setEditNewPod(true);
          console.log(error);
        }
      }
    }

    return (
        <>
        <AppBar 
          position="absolute"
        >
            <Container maxWidth="x1" sx={{ overflow: 'hidden' }}>
              <Toolbar disableGutters>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
                  <Link
                    to="/"
                    style={{ alignItems: 'center', display: 'inherit', padding: '10px' }}
                    onClick={() => {
                      localStorage.removeItem('activePod');
                      setActivePod(null);
                    }}>
                    <img src={require("./../logo/logo.png")} alt='logo' style={{ height: 60 }}/>
                  </Link>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {pods !== null && pods.map((pod) => (
                      <MenuItem
                        key={pod.name}
                        onClick={() => handleCloseNavMenu(pod.uuid)}
                        style={
                          activePod !== null && activePod === pod.uuid ?
                            { backgroundColor: '#9FB3C8', color: 'black' }
                          :
                            {  }
                        }
                      >
                        <Typography textAlign="center">{pod.name}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, flexGrow: 1 }} >
                  <Link 
                    to="/" 
                    style={{ alignItems: 'center', display: 'inherit', padding: '10px' }}
                    onClick={() => {
                      localStorage.removeItem('activePod');
                      setActivePod(null);
                    }}
                  >
                    <img src={require("./../logo/logo.png")} alt='logo' style={{ height: 60 }}/>
                  </Link>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pods !== null && pods.map((pod) => (
                    <Button
                      key={pod.name}
                      onClick={() => handleCloseNavMenu(pod.uuid)}
                      sx={
                        activePod !== null && activePod === pod.uuid ?
                          { my: 2, color: 'black', display: 'block', backgroundColor: '#9FB3C8' }
                        :
                          { my: 2, color: 'white', display: 'block' }
                      }
                    >
                      {pod.name}
                    </Button>
                  ))}
                  { !editNewPod ?
                    <Button color="secondary" variant="outlined" sx={{ my: 2, ml: 2, display: 'flex' }} onClick={() => setEditNewPod(true)}>
                      <Add />
                    </Button>
                  :
                    <>
                      <TextField 
                        variant='filled'
                        color='secondary'
                        value={newPodName}
                        onChange={(e) => setNewPodName(e.target.value)}
                      />
                      <Button color="secondary" variant="outlined" sx={{ my: 2, display: 'flex' }} onClick={handleCreateNewPod}>
                        <CheckCircleIcon />
                      </Button>
                      <Button
                        color="secondary"
                        variant="outlined"
                        sx={{ my: 2, display: 'flex' }}
                        onClick={() => {
                          setEditNewPod(false);
                          setNewPodName('');
                        }}
                      >
                        <CancelIcon />
                      </Button>
                    </>
                    
                  }
                  
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {actions.map((action) => (
                      <MenuItem key={action.name} onClick={action.handleClick}>
                        <Typography textAlign="center">{action.name}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
        </AppBar>
      </>
    );
}