import * as React from 'react';
import { useState, useEffect } from 'react';
// import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import Title from './Title';
import { getUsersByPodGame } from '../api/UserQueries';
import { useParams } from 'react-router-dom';

// const columns = [
//   { field: 'rank', headerName: 'Rank', type: 'number', sortable: false },
//   { field: 'name', headerName: 'Name', sortable: false },
//   { field: 'mostPlayed', headerName: 'Most Played', sortable: false },
//   { field: 'winrate', headerName: 'W / L', sortable: false },
// ]

export default function Leaderboard() {
  const [userData, setUserData] = useState([{id:0}]);
  let { uuid } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const users = await getUsersByPodGame(uuid);
        if (users) {
          console.log(users);
          const formattedData = formatRows(users);
          setUserData(formattedData);
        }
      } catch(err) {
        console.log(err);
      }
    }
    getData();
    // getGames();
  },[uuid]);

  const formatRows = (rawData) => {
    rawData.sort((a, b) => {
      const winsA = a.winrate;
      const winsB = b.winrate;
      if (winsA < winsB) return 1;
      if (winsA > winsB) return -1;
      return 0;
    });
    return rawData.map((row, i) => ({
        id: row.id,
        name: row.name,
        rank: i+1,
        winrate: row.winrate,
        mostPlayed: row.most_played || ''
      })
    );
  }
  return (
    <TableContainer component={Paper} sx={{ borderColor: '#0B2447' }}>
      <Table sx={{ borderColor: '#0B2447' }}>
        <TableHead sx={{ borderColor: '#0B2447' }}>
          <TableRow sx={{ borderColor: '#0B2447' }}>
            <TableCell sx={{ borderColor: '#102A43', fontSize: '1em' }}>Rank</TableCell>
            <TableCell sx={{ borderColor: '#102A43', fontSize: '1em' }}>Name</TableCell>
            <TableCell sx={{ borderColor: '#102A43', fontSize: '1em' }}>Wins</TableCell>
            <TableCell sx={{ borderColor: '#102A43', fontSize: '1em' }} align="right">Most Played</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {userData !== [] && userData.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{ borderColor: '#102A43', fontSize: '1.5em', color: '#fff' }} component="th" scope="row">{row.rank}</TableCell>
              <TableCell sx={{ borderColor: '#102A43', fontSize: '1.15em', color: '#fff' }}>{row.name}</TableCell>
              <TableCell sx={{ borderColor: '#102A43', fontSize: '1.15em', color: '#fff' }}>{row.winrate}</TableCell>
              <TableCell align="right" sx={{ borderColor: '#0B2447', fontSize: '1.15em', color: '#fff' }}>{row.mostPlayed}</TableCell>
              {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </TableContainer>
    // <div>
    //   <DataGrid
    //     rows={userData}
    //     columns={columns}
    //     pageSize={5}
    //     rowsPerPageOptions={[3]}
    //     disableRowSelectionOnClick={true}
    //     disableColumnSelector={true}
    //     disableColumnFilter={true}
    //     // checkboxSelection
    //   />
    // </div>
  );
}
