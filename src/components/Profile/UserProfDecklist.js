import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { getDecklist } from "../../api/UserQueries";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import {
  Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { CreateDeck } from "./UserProfAddDeck";

export default function UserProfDecklist() {
  const [decklist, setDecklist] = useState(null);
  const [addDeckFilter, setAddDeckFilter] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const decklistData = await getDecklist(user.id);
      console.log(decklistData);

      setDecklist(
        decklistData.map((deck) => ({
          ...deck,
          created_at: new Date(deck.created_at).toLocaleString(),
        }))
      );
    };
    if (user !== null) {
      getData();
    }
  }, [user]);



  return (
    <div>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Your Decklist
        </Typography>
        <TableContainer component={Paper} sx={{ borderColor: "#0B2447" }}>
          <Table sx={{ borderColor: "#0B2447" }}>
            <TableHead sx={{ borderColor: "#0B2447" }}>
              <TableRow sx={{ borderColor: "#0B2447" }}>
                <TableCell sx={{ borderColor: "#102A43", fontSize: "1em" }}>
                  Name
                </TableCell>
                <TableCell sx={{ borderColor: "#102A43", fontSize: "1em" }}>
                  Commander
                </TableCell>
                <TableCell
                  sx={{ borderColor: "#102A43", fontSize: "1em" }}
                  align="right"
                >
                  Date Added
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {decklist !== null &&
                decklist.map((deck) => (
                  <TableRow
                    key={deck.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        borderColor: "#102A43",
                        fontSize: "1.5em",
                        color: "#fff",
                      }}
                      component="th"
                      scope="row"
                    >
                      {deck.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderColor: "#102A43",
                        fontSize: "1.5em",
                        color: "#fff",
                      }}
                      component="th"
                      scope="row"
                    >
                      {deck.commander}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        borderColor: "#0B2447",
                        fontSize: "1.15em",
                        color: "#fff",
                      }}
                    >
                      {deck.created_at}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        {addDeckFilter? <CreateDeck setAddDeckFilter={setAddDeckFilter}/>
        :<Button variant="contained" color="secondary" sx={{ marginTop: "20px"}} onClick= {()=>setAddDeckFilter(true)}>
          Add Deck
        </Button>}
      </Grid>
    </div>
  );
}
