import { useState, useEffect, useRef } from "react";
import { Grid, Paper, Toolbar, TableRow, Box, Typography } from "@mui/material";
import { TableHead, TableContainer, TableCell } from "@mui/material";
import { TableBody, Table, Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import Sidebar from "../../components/shared/Sidebar";
import * as accountService from "../../services/admin/AccountService";
import * as courseAssignedService from "../../services/admin/CoursesAssignedService";
import * as degreeService from "../../services/admin/DegreeService";

const StudentCurriculumPage = () => {
  const [myCoursesAssigned, setMyCoursesAssigned] = useState([]);
  const [degree, setDegree] = useState([]);

  useEffect(() => {
    accountService
      .getCurrent()
      .then((response) => {
        let degreeId = response.data[0][10];
        degreeService.getDegreeById(degreeId).then((degree) => {
          setDegree(degree.data);
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Account may have already been deleted.");
        }
      });

    courseAssignedService
      .getMyCourses()
      .then((response) => {
        setMyCoursesAssigned(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Course may have already been deleted.");
        }
      });
  }, []);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Curriculum",
  });

  const handleCurriculum = () => {
    const curriculum = myCoursesAssigned;
    let groupByYear = curriculum.reduce((groupNow, a) => {
      (groupNow[a[9]] = groupNow[a[9]] || []).push(a);
      return groupNow;
    }, []);
    groupByYear = groupByYear.slice(1);

    let curriculumSem = groupByYear.map((data) => {
      return data.reduce((groupNow, a) => {
        (groupNow[a[10]] = groupNow[a[10]] || []).push(a);
        return groupNow;
      }, []);
    });
    let curriculumSemWithoutEmpty = [];
    curriculumSem.map((data) => {
      data.map((a) => {
        curriculumSemWithoutEmpty.push(a);
        return;
      });
      return;
    });
    return curriculumSemWithoutEmpty;
  };

  const handleSumOfUnits = (year, sem) => {
    let sum = 0;
    myCoursesAssigned
      .filter((course) => course[9] === year && course[10] === sem)
      .map((course) => {
        sum = sum + course[3];
        return;
      });
    return sum;
  };

  const handlePassedUnits = () => {
    let sum = 0;

    myCoursesAssigned.map((data) => {
      if (data[5] === "TAKEN") {
        sum += data[3];
      }
      return;
    });

    return sum;
  };

  const handleConvert = (number) => {
    let yearLevel = "";
    switch (number) {
      case "1":
        yearLevel = "FIRST";
        break;
      case "2":
        yearLevel = "SECOND";
        break;
      case "3":
        yearLevel = "THIRD";
        break;
      case "4":
        yearLevel = "FOURTH";
        break;
      case "5":
        yearLevel = "FIFTH";
        break;
      default:
        yearLevel = "NUMBER";
    }

    return yearLevel;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid sx={{ flexGrow: 1 }}>
          <Typography align="right">
            <Button
              onClick={() => {
                handlePrint();
              }}
              variant="contained"
              color="primary"
            >
              PRINT
            </Button>
          </Typography>
        </Grid>
        <Grid container>
          <Grid>
            <br />
            <Paper
              sx={{
                width: 200,
                height: 130,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
            >
              <TableContainer>
                <Table size="small" aria-label="a dense table">
                  <TableBody align="center">
                    <TableRow sx={{ backgroundColor: "#ff7961" }}>
                      <TableCell align="center" colSpan={2}>
                        <b>Summary</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Units Required</TableCell>
                      <TableCell>{degree.unitsRequired}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Units Passed</TableCell>
                      <TableCell>{handlePassedUnits()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Remaining Units</TableCell>
                      <TableCell>
                        {degree.unitsRequired - handlePassedUnits() >= 0
                          ? degree.unitsRequired - handlePassedUnits()
                          : ""}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid sx={{ flexGrow: 1 }} ref={componentRef}>
            <div align="center">
              <h2>{degree.degreeName}</h2>
            </div>
            {handleCurriculum().map((curriculum) => {
              return (
                <Box key={curriculum[0][0]}>
                  <Box align="center">
                    <h4>{handleConvert(curriculum[0][9])} YEAR LEVEL</h4>
                  </Box>
                  <Grid sx={{ flexGrow: 1 }} container spacing={5}>
                    <Grid item xs={12}>
                      <Grid container justifyContent="center" spacing={10}>
                        <Grid item>
                          <Paper
                            sx={{
                              width: 700,
                              backgroundColor: (theme) =>
                                theme.palette.mode === "dark"
                                  ? "#1A2027"
                                  : "#fff",
                            }}
                          >
                            <TableContainer>
                              <Table size="small" aria-label="a dense table">
                                <TableHead align="center">
                                  <TableRow>
                                    <TableCell align="center" colSpan={4}>
                                      {handleConvert(curriculum[0][10])}{" "}
                                      SEMESTER
                                    </TableCell>
                                  </TableRow>
                                  <TableRow sx={{ backgroundColor: "#ff7961" }}>
                                    <TableCell align="center" width="25%">
                                      Course Code
                                    </TableCell>
                                    <TableCell align="center">
                                      Course Name
                                    </TableCell>
                                    <TableCell align="center">Units</TableCell>
                                    <TableCell align="center">
                                      Remarks
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {curriculum.map((data) => {
                                    return (
                                      <TableRow key={data[0]}>
                                        <TableCell align="center">
                                          {data[1]}
                                        </TableCell>
                                        <TableCell align="center">
                                          {data[2]}
                                        </TableCell>
                                        <TableCell align="center">
                                          {data[3]}
                                        </TableCell>
                                        <TableCell align="center">
                                          {data[5] === "TAKEN" ? "PASSED" : ""}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                  <TableRow>
                                    <TableCell align="right" colSpan={2}>
                                      TOTAL
                                    </TableCell>
                                    <TableCell align="center">
                                      {handleSumOfUnits(
                                        curriculum[0][9],
                                        curriculum[0][10]
                                      )}
                                    </TableCell>
                                    <TableCell></TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Paper>
                          <Toolbar />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default StudentCurriculumPage;
