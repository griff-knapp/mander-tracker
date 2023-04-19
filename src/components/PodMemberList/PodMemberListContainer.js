import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { Autocomplete, Avatar, Badge, List, ListItemAvatar, ListItemButton, ListItemText, Paper, TextField } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// import { getGames } from "../api/UserQueries";

import { useParams } from 'react-router-dom';
import { addUserToPod, getUsers, getUsersByPod } from "../../api/UserQueries";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function PodMemberListContainer() {
    const [data, setData] = useState(null);
    const [userlist, setUserlist] = useState([]);
    const [addMember, setAddMember] = useState(false);
    const [newMemberValue, setNewMemberValue] = useState(null);
    const [newMemberInput, setNewMemberInput] = useState('');
    const { uuid } = useParams();

    useEffect(() => {
        setAddMember(false);
        const getData = async () => {
            let podUserList = null;
            if (uuid !== undefined && uuid !== null && typeof uuid === 'string') {
                const response = await getUsersByPod(uuid);
                console.log(response);
                if (response !== null) {
                    podUserList = response;
                    setData(response);
                }
            }
            const response = await getUsers();
            if (response !== null && podUserList !== null) {
                const filteredList = response.filter(user => podUserList.find(member => member.id === user.id) === undefined);
                const pod_id = podUserList.find(user => user.pod_id !== undefined).pod_id;
                console.log(pod_id);
                setUserlist(filteredList.map(user => (
                    {label: user.name, id: user.id, pod_id: pod_id}
                )));
            }
        }
        getData();
    },[uuid]);

    const refreshData = async () => {
        let podUserList = null;
        if (uuid !== undefined && uuid !== null && typeof uuid === 'string') {
            const response = await getUsersByPod(uuid);
            console.log(response);
            if (response !== null) {
                podUserList = response;
                setData(response);
            }
        }
        const response = await getUsers();
        if (response !== null && podUserList !== null) {
            const filteredList = response.filter(user => podUserList.find(member => member.id === user.id) === undefined);
            const pod_id = podUserList.find(user => user.pod_id !== undefined).pod_id;
            console.log(pod_id);
            setUserlist(filteredList.map(user => (
                {label: user.name, id: user.id, pod_id: pod_id}
            )));
        }
        setAddMember(false);
    }
    const handleAddMember = async () => {
        if (newMemberValue !== null) {
            try {
                const response = await addUserToPod(newMemberValue.pod_id, newMemberValue.id);
                console.log(response);
                refreshData();
            } catch(error) {
                console.log(error);
            }
        }
    }

    return (
        <>  
            {/* {data === null && 
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress />
                </Box>
            } */}
            <Paper
                sx={{
                // p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '93%'
                }}
            >
                <List sx={{ overflow: 'auto' }}>
                    {data !== null && data.map(member => (
                        <ListItemButton key={member.id}>
                        <ListItemAvatar>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant='dot'
                            >
                                <Avatar />
                            </StyledBadge>
                        </ListItemAvatar>
                        
                        <ListItemText
                            primary={member.name}
                            // secondary={'Admin'}
                        />
                        </ListItemButton>
                    ))
                    }
                    
                </List>
                <div style={{ display: 'block' }}>
                {!addMember && 
                    <div style={{ display: 'flex', justifyContent: 'end', margin: 10, alignItems: 'end' }}>
                        <Button sx={{ marginTop: 2 }} variant='contained' color="secondary" onClick={() => setAddMember(true)}>+ Member</Button>
                    </div>
                }
                {addMember &&
                    <>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={userlist}
                            sx={{ pt: 1, m: 1 }}
                            renderInput={(params) => <TextField {...params} label="User" />}
                            value={newMemberValue}
                            onChange={(e, newValue) => {
                                console.log(newValue);
                                setNewMemberValue(newValue)
                            }}
                            inputValue={newMemberInput}
                            onInputChange={(e, newValue) => setNewMemberInput(newValue)}
                        />
                        <div style={{ display: 'flex', justifyContent: 'end', marginRight: '1em', marginTop: -10 }}>
                            <Button 
                                color="secondary" 
                                variant="outlined" 
                                sx={{ my: 2, display: 'flex' }}
                                onClick={handleAddMember}
                            >
                                <CheckCircleIcon />
                            </Button>
                            <Button
                                color="secondary"
                                variant="outlined"
                                size="small"
                                sx={{ my: 2, display: 'flex' }}
                                onClick={() => {
                                    setAddMember(false);
                                    setNewMemberInput('');
                                    setNewMemberValue(null);
                                }}
                            >
                                <CancelIcon />
                            </Button>
                        </div>
                        
                    </>  
                }
                </div>
            </Paper>
            
        </>
            
    );
}