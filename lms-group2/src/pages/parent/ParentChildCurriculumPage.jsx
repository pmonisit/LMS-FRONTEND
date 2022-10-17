import { Grid, Toolbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { TableHead } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import Sidebar from "../../components/shared/Sidebar";
import { CurriculumContext } from "../../context/student/CurriculumContext";
import { createContext, useState, useEffect } from "react";
import * as accountService from "../../services/admin/AccountService";
import * as courseAssignedService from "../../services/admin/CoursesAssignedService";
import * as degreeService from "../../services/admin/DegreeService";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams } from "react-router-dom";

const ParentChildCurriculumPage = () => {
  const [user, setUser] = useState([]);
  const [myCoursesAssigned, setMyCoursesAssigned] = useState([]);
  const [degree, setDegree] = useState([]);

  useEffect(() => {
    accountService.getCurrentChildInfo().then((response) => {
      console.log(response.data);
      setUser(response.data[0]);
      let degreeId = response.data[0][10];
      degreeService.getDegreeById(degreeId).then((degree) => {
        setDegree(degree.data);
      });
    });
    courseAssignedService.getMyCourses().then((response) => {
      setMyCoursesAssigned(response.data);
    });
  }, []);

  const handleCurriculum = () => {
    const curriculum = myCoursesAssigned;
    let groupByYear = curriculum.reduce((groupNow, a) => {
      (groupNow[a[7]] = groupNow[a[7]] || []).push(a);
      return groupNow;
    }, []);
    groupByYear = groupByYear.slice(1);
    let sortedCurriculum = [];
    groupByYear.map((data) => {
      sortedCurriculum.push(
        data.sort((a, b) => {
          return a[8].localeCompare(b[8]);
        })
      );
    });

    let curriculumSem = groupByYear.map((data) => {
      return data.reduce((groupNow, a) => {
        (groupNow[a[8]] = groupNow[a[8]] || []).push(a);
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
    myCoursesAssigned
      .filter((course) => course[7] === year && course[8] === sem)
      .map((course) => {
        sum = sum + course[2];
      });
    return sum;
  };

  const handlePassedUnits = () => {
    let sum = 0;
    {
      myCoursesAssigned.map((data) => {
        if (data[3] === "TAKEN") {
          sum += data[2];
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
      {/* <Sidebar /> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid>
          <Toolbar />
          <Tooltip title="Back to dashboard">
            <Link to={`/parent/dashboard`}>
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <div align="center">
            <h2>{degree.degreeName}</h2>
          </div>
          <br />
          <Paper
            sx={{
              width: 200,
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

          {handleCurriculum().map((curriculum) => {
            return (
              <Box key={curriculum[0][9]}>
                <Box align="center">
                  <h4>{handleConvert(curriculum[0][7])} YEAR LEVEL</h4>
                </Box>
                <Grid sx={{ flexGrow: 1 }} container spacing={5}>
                  <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={10}>
                      <Grid item>
                        <Paper
                          sx={{
                            // height: 280,
                            width: 500,
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
                                    {handleConvert(curriculum[0][8])} SEMESTER
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
                                  <TableCell align="center">Remarks</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {curriculum.map((data) => {
                                  return (
                                    <TableRow key={data[9]}>
                                      <TableCell>{data[0]}</TableCell>
                                      <TableCell>{data[1]}</TableCell>
                                      <TableCell align="center">
                                        {data[2]}
                                      </TableCell>
                                      <TableCell align="center">
                                        {data[3] === "TAKEN" ? "PASSED" : ""}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                                <TableRow>
                                  <TableCell align="right" colSpan={2}>
                                    TOTAL
                                  </TableCell>
                                  <TableCell>
                                    {handleSumOfUnits(
                                      curriculum[0][7],
                                      curriculum[0][8]
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
      </Box>
    </Box>
  );
};
export default ParentChildCurriculumPage;
