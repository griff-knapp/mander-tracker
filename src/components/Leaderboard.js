import * as React from 'react';
import { useState, useEffect } from 'react';
// import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { getGames, getUsers } from '../api/UserQueries';

// Generate Order Data
// function createData(id, name, rank, winrate, mostPlayed) {
//   return { id, name, rank, winrate, mostPlayed };
// }

// const rows = [
//   createData(
//     0,
//     'Ray Flaks',
//     1,
//     '24 / 1',
//     'Gisath',
//   ),
//   createData(
//     1,
//     'Justin \'J-con\' Conwisar',
//     2,
//     '15 / 10',
//     'Nekusar',
//   ),
//   createData(
//     2,
//     'Griffin Knapp',
//     3,
//     '5 / 20',
//     'Jinnie Fay',
//   ),
//   createData(
//     3,
//     'Jacob Gyory',
//     4,
//     '3 / 22',
//     'Gates',
//   ),
//   createData(
//     4,
//     'Aidan \'Shitburger\' Denahy',
//     5,
//     '0 / 25',
//     'Kros',
//   ),
// ];

export default function Leaderboard() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    console.log('sup');
    const getData = async () => {
      try {
        const users = await getUsers();
        if (users) {
          const formattedData = formatRows(users);
          setUserData(formattedData);
        }
      } catch(err) {
        console.log(err);
      }
    }
    getData();
    getGames();
  },[]);

  const formatRows = (rawData) => {
    return rawData.map(row => {
      return ({
        id: row.id,
        name: row.name,
        rank: 1,
        winrate: row.stats.winrate,
        mostPlayed: row.stats.most_played
      });
    })
  }
  return (
    <React.Fragment>
      <Title>Leaderboard</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Winrate</TableCell>
            <TableCell align="right">Most Played</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {userData !== [] && userData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.winrate}</TableCell>
              <TableCell align="right">{row.mostPlayed}</TableCell>
              {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
