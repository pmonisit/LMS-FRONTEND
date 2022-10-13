import { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import { EnrolContext } from "../../context/student/EnrolContext";

const StudentSchedulePage = () => {
  const { currentSem, scheduleColumns, myEnrolledSLoads, handleSchedule } =
    useContext(EnrolContext);
  return (
    <Grid>
      <br />
      <h3 align="center">
        Schedule for {currentSem.semOrder} AY {currentSem.startingYear} -
        {currentSem.endingYear}
      </h3>
      <Grid sx={{ flexGrow: 1 }} container spacing={5}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={10}>
            <Grid item>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer>
                  <Table>
                    <TableHead align="center">
                      <TableRow>
                        <TableCell>Time</TableCell>
                        {scheduleColumns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>{handleSchedule()}</TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StudentSchedulePage;
