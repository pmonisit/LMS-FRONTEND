import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer } from "@mui/material";
import { Paper, TableHead, TableRow, Grid, Toolbar } from "@mui/material";
import { Tooltip, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as semesterService from "../../services/admin/Semester";
import * as gradeService from "../../services/professor/GradeService";

const ParentChildGrade = () => {
  const [myChildSemestersWithGrades, setMyChildSemestersWithGrades] = useState(
    []
  );
  const [myChildGradesWithSem, setMyChildGradesWithSem] = useState([]);
  useEffect(() => {
    let myChildGradesWithSem = [];
    let id = 0;
    semesterService.getMyChildSemestersWithGrades().then((response) => {
      setMyChildSemestersWithGrades(response.data);
      response.data.map((resp) => {
        let semId = resp[0];
        let merge = [];
        gradeService.getChildGradesBySem(semId).then((res) => {
          res.data.map((a) => {
            merge = [id++, ...resp, ...a];
            myChildGradesWithSem.push(merge);
            setMyChildGradesWithSem(myChildGradesWithSem);
          });
        });
      });
    });
  }, []);

  const gradeColumns = [
    { id: "courseCode", label: "Course\u00a0Code", minWidth: 100 },
    { id: "courseName", label: "Course\u00a0Name", minWidth: 100 },
    { id: "section", label: "Section", minWidth: 100 },
    { id: "instructor", label: "Instructor", minWidth: 100 },
    { id: "units", label: "Units", minWidth: 100 },
    { id: "grade", label: "Grade", minWidth: 100 },
    { id: "remark", label: "Remarks", minWidth: 100 },
  ];

  const renderGrades = (semId) => {
    const sgrades = myChildGradesWithSem.filter((data) => data[1] === semId);

    return sgrades.map((data) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={data[0]}>
          <TableCell>{data[5]}</TableCell>
          <TableCell>{data[6]}</TableCell>
          <TableCell>{data[9]}</TableCell>
          <TableCell>
            {data[11]}, {data[10]}
          </TableCell>
          <TableCell>{data[12]}</TableCell>
          <TableCell>{data[7]}</TableCell>
          <TableCell>{data[8]}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Grid>
      <Toolbar />
      <Tooltip title="Back to dashboard">
        <Link to={`/parent/dashboard`}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </Tooltip>
      {myChildSemestersWithGrades.map((semester) => (
        <Grid key={semester[0]}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <h3 align="center">
              {semester[3]} AY {semester[1]} - {semester[2]}
            </h3>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {gradeColumns.map((column) => (
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
                <TableBody>{renderGrades(semester[0])}</TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Toolbar />
        </Grid>
      ))}
    </Grid>
  );
};
export default ParentChildGrade;
