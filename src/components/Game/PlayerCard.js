import { Card, CardContent, Button, Typography, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

export function PlayerCard(props) {
    const { name, decklist, winner, playerID, handleChangeCommander, refreshData } = props;
    // const [anchorEl, setAnchorEl] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    // const [menuOpen, setMenuOpen] = useState(false);
    const [deckName, setDeckName] = useState('');

    const handleClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
        // console.log(event.currentTarget);
    };
    const handleClose = () => {
        setMenuAnchorEl(null);
        refreshData();
    };

    const menuOpen = Boolean(menuAnchorEl);

    useEffect(() => {
        if (decklist !== undefined && decklist.find(deck => deck.did_play === true) !== undefined) {
            setDeckName(decklist.find(deck => deck.did_play === true).commander);
        }
    },[decklist]);

    return (
        <Card sx={{ backgroundColor: '#9FB3C8', height: '150px', display: 'flex', alignItems: 'start' }}>
            {/* <CardActionArea sx={{ height: '150px' }}> */}
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div' color='black'>
                        {name}  {winner !== null && winner === name &&
                                    <FontAwesomeIcon style={{ color: 'gold' }} icon={faCrown} />
                                }
                    </Typography>
                    <Button variant='outlined' onClick={handleClick}>
                        {deckName !== '' ? deckName : 'Choose A Deck'}
                    </Button>
                    <Menu
                        id="lock-menu"
                        anchorEl={menuAnchorEl}
                        open={menuOpen}
                        onClose={handleClose}
                        MenuListProps={{
                            role: 'listbox',
                        }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {decklist && decklist.map(deck => (
                            <MenuItem key={deck.name} onClick={(e) => {handleChangeCommander(e.target.id, e.target.value); handleClose();}} value={playerID} id={deck.name}>
                                {deck.name + ' - ' + deck.commander}
                            </MenuItem>
                        ))}
                        {/* <MenuItem
                            onClick={handleClose}
                        >
                            {'yo'}
                        </MenuItem>
                        <MenuItem
                            onClick={handleClose}
                        >
                            {'yo'}
                        </MenuItem> */}
                    </Menu>
                </CardContent>
            {/* </CardActionArea> */}
        </Card>
    );
}