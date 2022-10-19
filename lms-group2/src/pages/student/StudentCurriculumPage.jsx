import { useState, useEffect } from "react";
import { Grid, Paper, Toolbar, TableRow, Box } from "@mui/material";
import { TableHead, TableContainer, TableCell } from "@mui/material";
import { TableBody, Table } from "@mui/material";
import Sidebar from "../../components/shared/Sidebar";
import * as accountService from "../../services/admin/AccountService";
import * as courseAssignedService from "../../services/admin/CoursesAssignedService";
import * as degreeService from "../../services/admin/DegreeService";

const StudentCurriculumPage = () => {
  const [myCoursesAssigned, setMyCoursesAssigned] = useState([]);
  const [degree, setDegree] = useState([]);

  useEffect(() => {
    accountService.getCurrent().then((response) => {
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
    console.log(curriculum);
    let groupByYear = curriculum.reduce((groupNow, a) => {
      (groupNow[a[9]] = groupNow[a[9]] || []).push(a);
      return groupNow;
    }, []);
    groupByYear = groupByYear.slice(1);

    // console.log(groupByYear);
    // let sortedCurriculum = [];
    // groupByYear.map((data) => {
    //   return sortedCurriculum.push(
    //     data.sort((a, b) => {
    //       return parseInt(a[10]) - parseInt(b[10]);
    //     })
    //   );
    // });
    // console.log(groupByYear);
    // console.log(sortedCurriculum);

    let curriculumSem = groupByYear.map((data) => {
      return data.reduce((groupNow, a) => {
        (groupNow[a[10]] = groupNow[a[10]] || []).push(a);
        return groupNow;
      }, []);
    });
    console.log(curriculumSem);
    let curriculumSemWithoutEmpty = [];
    curriculumSem.map((data) => {
      data.map((a) => {
        curriculumSemWithoutEmpty.push(a);
      });
    });
    console.log(curriculumSemWithoutEmpty);
    return curriculumSemWithoutEmpty;
  };

  const handleSumOfUnits = (year, sem) => {
    let sum = 0;
    myCoursesAssigned
      .filter((course) => course[9] === year && course[10] === sem)
      .map((course) => {
        sum = sum + course[3];
      });
    return sum;
  };

  const handlePassedUnits = () => {
    let sum = 0;
    {
      myCoursesAssigned.map((data) => {
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
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid>
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
        <Grid>
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
                                    {handleConvert(curriculum[0][10])} SEMESTER
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
                                    <TableRow key={data[0]}>
                                      <TableCell>{data[1]}</TableCell>
                                      <TableCell>{data[2]}</TableCell>
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
      </Box>
    </Box>
  );
};
export default StudentCurriculumPage;
