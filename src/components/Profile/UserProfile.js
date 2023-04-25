import { useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import { getUser } from "../../api/UserQueries";
import { Decklist } from "../Deck/Decklist";
import { useState } from "react";
import EditProfileForm from "./EditProfile";
import ProfileCard from "./ProfileCard";

import {
  Container,
  Grid,
  Paper,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import UserProfDecklist from "./UserProfDecklist";

export function UserProfile() {
  const [data, setData] = useState(null);
  const [editFilter, setEditFilter] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const userData = await getUser(user.email);
      console.log("userData", userData);
      setData(userData[0]);
    };
    if (user !== null) {
      getData();
    }
  }, [user]);

  const handleAvatarChange = (image) => {
    setAvatar(image);
  };

  const handleSave = () => {
    console.log("saved")
    setEditFilter(false)
  };

  return user ? (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container
        maxWidth="lg"
        sx={{ mt: 4, mb: 4, display: "flex", flexWrap: "wrap" }}
      >
        <Grid container spacing={3}>
          {/* <Typography variant='h5' sx={{ mb: 0.5 }}>User</Typography> */}
          <Grid item xs={6}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left",
                minHeight: 250,
              }}
            >
              {editFilter ? (
                <EditProfileForm user={user} handleSave= {handleSave} handleAvatarChange={handleAvatarChange} />
              ) : (
                <ProfileCard user={user} setEditFilter={setEditFilter} />
              )}
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left",
                flexDirection: "column",
                paddingTop: "20px",
                paddingLeft: "30px",
                minHeight: 250,
                maxHeight: 250,
              }}
            >
              <Typography
                variant="h5"
                align="left"
                sx={{ paddingBottom: "15px" }}
              >
                Most used deck: {user.mostUsedDeck}
              </Typography>
              <Typography
                variant="h5"
                align="left"
                sx={{ paddingBottom: "15px" }}
              >
                Games played: {user.totalGames}
              </Typography>
              <Typography
                variant="h5"
                align="left"
                sx={{ paddingBottom: "15px" }}
              >
                Win-Loss Ratio: {user.totalWins / user.totalLosses}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <UserProfDecklist />
          </Grid>
        </Grid>
      </Container>
    </Box>
  ) : (
    <div />
  );
}
