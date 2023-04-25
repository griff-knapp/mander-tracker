import {
  Button,
  TextField,
  Box,
  Typography,
  CardContent,
  Avatar,
} from "@mui/material";
// import FileInput from "react-material-fileinput";

export default function EditProfileForm({
  user,
  handleSave,
  handleAvatarChange,
}) 


{
  return (
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "left",
        minHeight: 200,
        maxHeight: 250,
        paddingTop: "30px",
        paddingLeft: "40px",
      }}
    >
      <Avatar
        sx={{
          width: "200px",
          height: "200px",
          margin: "auto",
          paddingLeft: "-20px",
        }}
        alt={user.name}
        src={user.photo}
      />
      <Box
        sx={{
          paddingLeft: "30px",
        }}
      >
        <TextField label="Name" defaultValue={user.name} />

        <Typography variant="h5" align="left" sx={{ paddingBottom: "15px" }}>
          {user.email}
        </Typography>
        <Button
          sx={{
            paddingTop: "10px",
            paddingLeft: "0px",
            justifyContent: "center",
            alignContent: "center",
          }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </CardContent>
  );
}
