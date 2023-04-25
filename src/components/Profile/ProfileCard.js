import { Button,  CardContent, Avatar, Box, Typography } from "@mui/material";

export default function ProfileCard({user, setEditFilter}) {
    return (
        <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
          alignItems: "left",
          minHeight: 200,
          maxHeight: 250,
          paddingTop: '30px',
          paddingLeft: '40px'
        }}
      >
        <Avatar
          sx={{
            width: "200px",
            height: "200px",
            margin: "auto",
            paddingLeft:'-20px'
          }}
          alt={user.name}
          src={user.photo}
        />
        <Box sx={{
          paddingLeft:'30px'
        }}>
        <Typography variant="h3" align="left"
        sx={{
          paddingTop: '20px'
        }}>
          {user.name}
        </Typography>
        <Typography variant="h5" align="left"
        sx={{paddingBottom: '15px'}}>
          {user.email}
        </Typography>
        <Button
                sx={{
                  paddingTop: '10px',
                  paddingLeft:'0px',
                  justifyContent: 'center',
                  alignContent: 'center'
        
                }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={()=> setEditFilter(true)}
                >
                  Edit Profile
                </Button>
        </Box>
       
      </CardContent>
    );
  }
  
