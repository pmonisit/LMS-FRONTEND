import { useState, useEffect } from "react";
import { Grid, Paper, Toolbar, TableRow, Box } from "@mui/material";
import { TableHead, TableContainer, TableCell } from "@mui/material";
import { TableBody, Table, IconButton, Tooltip } from "@mui/material";
import Sidebar from "../../components/shared/Sidebar";
import * as accountService from "../../services/admin/AccountService";
import * as courseAssignedService from "../../services/admin/CoursesAssignedService";
import * as degreeService from "../../services/admin/DegreeService";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ParentChildCurriculumPage = () => {
  const [myChildCoursesAssigned, setMyChildCoursesAssigned] = useState([]);
  const [degree, setDegree] = useState([]);

  useEffect(() => {
    accountService.getCurrentChildInfo().then((response) => {
      console.log(response.data);
      degreeService.getDegreeById(response.data[0][10]).then((degree) => {
        setDegree(degree.data);
      });
    });
    courseAssignedService.getMyCoursesParent().then((response) => {
      setMyChildCoursesAssigned(response.data);
    });
  }, []);

  const handleCurriculum = () => {
    const curriculum = myChildCoursesAssigned;
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
      });
    });
    return curriculumSemWithoutEmpty;
  };

  const handleSumOfUnits = (year, sem) => {
    let sum = 0;
    myChildCoursesAssigned
      .filter((course) => course[9] === year && course[10] === sem)
      .map((course) => {
        sum = sum + course[3];
      });
    return sum;
  };

  const handlePassedUnits = () => {
    let sum = 0;
    {
      myChildCoursesAssigned.map((data) => {
        if (data[5] === "TAKEN") {
          sum += data[3];
        }
      });
    }
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Tooltip title="Back to dashboard">
          <Link to={`/parent/dashboard`}>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </Tooltip>
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
                    <TableRow>
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
          <Grid sx={{ flexGrow: 1 }}>
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
                                  <TableRow>
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
          <Toolbar />
        </Grid>
      </Box>
    </Box>
  );
};
export default ParentChildCurriculumPage;
