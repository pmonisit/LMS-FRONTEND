import { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  TableContainer,
  TableHead,
  Table,
  Typography,
} from "@mui/material";
import { TableBody, TableCell, TableRow, Toolbar } from "@mui/material";
import * as semesterService from "../../services/admin/Semester";
import * as gradeService from "../../services/professor/GradeService";

const StudentGrade = () => {
  const [mySemestersWithGrades, setMySemestersWithGrades] = useState([]);
  const [myGradesWithSem, setMyGradesWithSem] = useState([]);

  useEffect(() => {
    let myGradesWithSem = [];
    let id = 0;
    semesterService.getMySemestersWithGrades().then((response) => {
      setMySemestersWithGrades(response.data);
      response.data.map((resp) => {
        let semId = resp[0];
        let merge = [];
        gradeService.getMyGradesBySemId(semId).then((res) => {
          res.data.map((a) => {
            merge = [id++, ...resp, ...a];
            myGradesWithSem.push(merge);
            setMyGradesWithSem(myGradesWithSem);
          });
        });
      });
    });
  }, []);

  const gradeColumns = [
    {
      id: "courseCode",
      label: "Course\u00a0Code",
      minWidth: 100,
      align: "center",
    },
    {
      id: "courseName",
      label: "Course\u00a0Name",
      minWidth: 100,
      align: "center",
    },
    { id: "section", label: "Section", minWidth: 100, align: "center" },
    { id: "instructor", label: "Instructor", minWidth: 100, align: "center" },
    { id: "units", label: "Units", minWidth: 100, align: "center" },
    { id: "grade", label: "Grade", minWidth: 100, align: "right" },
    { id: "remark", label: "Remarks", minWidth: 100, align: "center" },
  ];

  const renderGrades = (semId) => {
    const sgrades = myGradesWithSem.filter((data) => data[1] === semId);

    return sgrades;
  };

  const handleAverage = (semester) => {
    let average = 0;
    let units = 0;
    let sumGradesXUnits = 0;
    let result = [];
    myGradesWithSem
      .filter(
        (data) =>
          data[1] === semester[0] &&
          data[2] === semester[1] &&
          data[3] === semester[2]
      )
      .map((data) => {
        units = units + data[12];
        sumGradesXUnits = sumGradesXUnits + data[7] * data[12];
      });

    result.push(units);
    if (units > 0) {
      result.push(sumGradesXUnits / units);
    } else {
      result.push(0);
    }
    return result;
  };

  return (
    <Grid>
      <Toolbar />

      {mySemestersWithGrades.length > 0 ? (
        mySemestersWithGrades.map((semester) => (
          <Grid key={semester[0]}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <h3 align="center">
                {semester[3]} AY {semester[1]} - {semester[2]}
              </h3>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
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
                  <TableBody>
                    {renderGrades(semester[0]).length > 0 ? (
                      renderGrades(semester[0]).map((data) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={data[0]}
                          >
                            <TableCell align="center">{data[5]}</TableCell>
                            <TableCell align="center">{data[6]}</TableCell>
                            <TableCell align="center">{data[9]}</TableCell>
                            <TableCell align="center">
                              {data[11]}, {data[10]}
                            </TableCell>
                            <TableCell align="center">{data[12]}</TableCell>
                            <TableCell align="right">{data[7]}</TableCell>
                            <TableCell align="center">{data[8]}</TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={9}>
                          No Grades Available.
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell colSpan={3}></TableCell>
                      <TableCell align="right">
                        <b>Total:</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>{handleAverage(semester)[0]}</b>
                      </TableCell>
                      <TableCell align="left" colSpan={2}>
                        <b>Average: {handleAverage(semester)[1]}</b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Toolbar />
          </Grid>
        ))
      ) : (
        <Typography>
          <strong>No Availabe Grades.</strong>
        </Typography>
      )}
    </Grid>
  );
};
export default StudentGrade;
