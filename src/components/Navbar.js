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

import { useState } from 'react';
import { useAuth } from '../contexts/Auth';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

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



const pages = ['The Northern Boys', 'Climbing Wolf', 'Tarrytown Apt'];

export function Navbar() {
    const { signOut, session } = useAuth();
    // const [open, setOpen] = useState(false);
    // const [dialOpen, dialSetOpen] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const history = useHistory();
    
    // const handleOpen = () => dialSetOpen(true);
    // const handleClose = () => dialSetOpen(false);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
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

    // const handleAddDeck = () => {
    //   console.log('deck added!');
    //   history.push('/new-deck');
    // }

    const actions = [
      {
        icon: <AccountCircleIcon />,
        name: 'Profile',
        handleClick: () => {
          handleCloseUserMenu();
          history.push('/user-profile');
        }
      },
      {
        icon: <ViewCarouselIcon />,
        name: 'View Decks',
        handleClick: () => {
          handleCloseUserMenu();
          history.push('/decklist');
        }
      },
      { 
        icon: <AddCardIcon />,
        name: 'Add Deck',
        handleClick: () => {
          handleCloseUserMenu();
          history.push('/new-deck')
        }
      },
      { 
        icon: <ExitToAppIcon />,
        name: 'Sign Out',
        handleClick: async () => {
          await signOut();
          handleCloseUserMenu();
          history.push('/login');
        }
      },
    ];

    return (
        <>
        <AppBar 
          position="absolute"
          // open={open}
        >
            <Container maxWidth="x1">
              <Toolbar disableGutters>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
                  <Link to="/" style={{ alignItems: 'center', display: 'inherit', padding: '10px' }}>
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
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, flexGrow: 1 }} >
                  <Link to="/" style={{ alignItems: 'center', display: 'inherit', padding: '10px' }}>
                    <img src={require("./../logo/logo.png")} alt='logo' style={{ height: 60 }}/>
                  </Link>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page}
                    </Button>
                  ))}
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
            {/* <Toolbar
                sx={{
                pr: '24px',
                }}
            >
                <div
                  component="h1"
                  variant="h5"
                  color="inherit"
                  noWrap
                  style={{ flexGrow: 1, display: 'flex' }}
                >
                    <Link to="/" style={{ alignItems: 'center', display: 'inherit', padding: '10px' }}>
                      <img src={require("./../logo/logo.png")} alt='logo' style={{ height: 60 }}/>
                    </Link>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} >
                  <SpeedDial
                    ariaLabel="SpeedDial controlled open example"
                    sx={{ position: 'absolute', top: 15, right: 20 }}
                    FabProps={{color: 'secondary', size: 'medium'}}
                    direction='down'
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={dialOpen}
                  >
                    {actions.map(action => (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => {
                          handleClose();
                          action.handleClick();
                        }}
                      />
                    ))}
                  </SpeedDial>
                  <div>
                    &emsp;&emsp;&emsp;
                  </div>
                </div>
            </Toolbar> */}
        </AppBar>
        {/* <Drawer variant="permanent" open={true}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav" sx={{ textAlign: 'center' }}>
          <Typography variant='h6' sx={{ fontWeight: '400' }}>PODS</Typography>
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer> */}
      </>
    );
}