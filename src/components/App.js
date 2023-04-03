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

const mdTheme = createTheme();

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
              </Switch>
            </Box>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}
