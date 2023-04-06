import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "../contexts/Auth";

import { Signup } from "./Signup";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { PrivateRoute } from "./PrivateRoute";
import { CreateGame } from "./Game/CreateGame";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import { Navbar } from "./Navbar";
import { DetailContainer } from "./Game/DetailContainer";
import { CreateDeck } from "./Deck/CreateDeck";
import { useEffect, createContext } from "react";
import { Decklist } from "./Deck/Decklist";

const mdTheme = createTheme({
  palette: {
    primary: { main: '#102A43' },
    secondary: { main: '#9FB3C8' },
    warning: { main: '#A5D7E8' },
    background: { default: '#121212', paper: '#243B53' },
    action: { selected: '#9FB3C8', hover: '#0B2447', active: '#9FB3C8' },
    divider: '#102A43',
    text: { primary: '#fffc', secondary: '#fffc', disabledBackground: '#fff', hover: '#121212', subtitle: '#fffc' },
    table: { borderColor: '#0B2447' }
  }
});

export function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <Navbar />
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/new-game" component={CreateGame}/>
                <Route path="/game:uuid?" component={DetailContainer} />
                <Route path="/new-deck" component={CreateDeck} />
                <Route path="/decklist" component={Decklist} />
              </Switch>
            </Box>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}
