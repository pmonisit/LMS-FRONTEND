// React
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Material Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";

// Service
import * as lectureService from "../../services/professor/LectureService";
import * as accountService from "../../services/shared/accounts";

const StudentListPerLectureComponent = () => {
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState([]);
  const params = useParams();

  useEffect(() => {
    accountService.getCurrentUser().then((response) => {
      setUser(response.data[0]);
      // console.log(response.data[0]);
    });

    lectureService.getStudentsPerLecture(params.id).then((response) => {
      setStudents(response.data);
      // console.log(response.data);
    });
  }, [students]);

  return (
    <Grid container justifyContent="center" component="form" marginTop={10}>
      <Grid item xs={10} sm={10} md={10} lg={10} xl={6}>
        <Tooltip title="Back to dashboard">
          <Link to={`/professor/dashboard/${user[0]}`}>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Typography marginBottom={3} textAlign="center" variant="h6">
          List of Students
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Middle Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Final Grade</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((row) => (
                <TableRow key={row[4]}>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                  <TableCell>{row[3]}</TableCell>
                  <TableCell>{row[8]}</TableCell>
                  <TableCell>
                    {row[9] === "PASSED" ? (
                      <Chip label="Passed" color="success" />
                    ) : row[9] === "CONDITIONAL" ? (
                      <Chip label="Conditional" color="warning" />
                    ) : (
                      <Chip label="Failed" color="error" />
                    )}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Tooltip title="Edit Grade">
                      <Link to={`/professor/dashboard/addGrade/${row[7]}`}>
                        <Fab size="small" color="primary" aria-label="edit">
                          <EditIcon />
                        </Fab>
                      </Link>
                    </Tooltip>
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

export default StudentListPerLectureComponent;
