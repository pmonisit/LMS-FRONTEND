import { useContext } from "react";
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

const StudentCurriculumPage = () => {
  const {
    degree,
    myCoursesAssigned,
    handleCurriculum,
    handleConvert,
    handleSumOfUnits,
    handlePassedUnits,
  } = useContext(CurriculumContext);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid>
          <Toolbar />
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
export default StudentCurriculumPage;
