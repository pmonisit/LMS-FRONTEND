// React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Material Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import GroupIcon from "@mui/icons-material/Group";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

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
    <Grid
      container
      justifyContent="center"
      component="form"
      marginTop={10}
      marginRight={3}
    >
      <Grid item xs={10} sm={10} md={12} lg={12} xl={11}>
        <Typography marginBottom={3} textAlign="center" variant="h6">
          My Schedule
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Lists</TableCell>
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
                  <TableCell align="center">
                    <Tooltip title="View Students">
                      <Link to={`/professor/dashboard/studentLists/${row[0]}`}>
                        <IconButton>
                          <GroupIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </TableCell>
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
                  <TableCell>
                    {row[9] ? (
                      <Chip label="On-Going" color="success" />
                    ) : (
                      <Chip label="Completed" color="error" />
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
