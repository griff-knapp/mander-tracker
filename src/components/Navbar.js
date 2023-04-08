import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddCardIcon from '@mui/icons-material/AddCard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

import { useState } from 'react';
import { useAuth } from '../contexts/Auth';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const drawerWidth = 150;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);





export function Navbar() {
    const { signOut, session } = useAuth();
    const [open, setOpen] = useState(false);
    const [dialOpen, dialSetOpen] = useState(false);

    const history = useHistory();
    
    const handleOpen = () => dialSetOpen(true);
    const handleClose = () => dialSetOpen(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };
      
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
        icon: <ViewCarouselIcon />,
        name: 'View Decks',
        handleClick: () => {
          history.push('/decklist');
        }
      },
      { 
        icon: <AddCardIcon />,
        name: 'Add Deck',
        handleClick: () => {
          history.push('/new-deck')
        }
      },
      { 
        icon: <ExitToAppIcon />,
        name: 'Sign Out',
        handleClick: async () => {
          await signOut();
          history.push('/login');
        }
      },
    ];

    return (
        <>
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                pr: '24px', // keep right padding when drawer closed
                }}
            >
                {/* <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                }}
                >
                <MenuIcon />
                </IconButton> */}
                <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
                >
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Post Combat</Link>
                </Typography>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} >
                  <Typography
                      component="h4"
                      color="inherit"
                      noWrap
                      edge="end"
                      sx={{ flexGrow: 1 }}
                  >
                      {session !== null && session.user !== undefined && session.user.email}
                  </Typography>
                  <SpeedDial
                    ariaLabel="SpeedDial controlled open example"
                    sx={{ position: 'absolute', top: 8, right: 20 }}
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
                  {/* <Button variant="contained" color="secondary" onClick={handleAddDeck}>+ Deck</Button>
                  <Button variant="outlined" color="secondary" onClick={handleSignout}>Sign out</Button> */}
                </div>
            
                {/* <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                </Badge>
                </IconButton> */}
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={true}>
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
          {/* {mainListItems} */}
          <Typography variant='h6' sx={{ fontWeight: '400' }}>PODS</Typography>
          <Divider sx={{ my: 1 }} />
          {/* {secondaryListItems} */} 
        </List>
      </Drawer>
      </>
    );
}