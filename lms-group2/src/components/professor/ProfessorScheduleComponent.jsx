// React
import React, { useState, useEffect } from "react";

// Material Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";

// Service
import * as lectureService from "../../services/professor/LectureService";

const ProfessorScheduleComponent = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    lectureService.getProfLoad().then((response) => {
      setRows(response.data);
      // console.log(response.data);
    });
  }, [rows]);

  return (
    <Grid container justifyContent="center" component="form" marginTop={4}>
      <Grid item xs={10} sm={10} md={8} lg={8} xl={8}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Lecture ID</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Course Code</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Day Schedule</TableCell>
                <TableCell>Time Schedule</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row[0]}>
                  <TableCell>{row[0]}</TableCell>
                  <TableCell>{row[7]}</TableCell>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                  <TableCell>
                    {row[3]} {row[4]}
                  </TableCell>
                  <TableCell>
                    {row[5]} - {row[6]}
                  </TableCell>
                  <TableCell>{row[8]}</TableCell>
                  <TableCell align="center">
                    {row[9] ? (
                      <Badge badgeContent={"OnGoing"} color="success"></Badge>
                    ) : (
                      <Badge
                        badgeContent={"Completed"}
                        color="secondary"
                      ></Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ProfessorScheduleComponent;
