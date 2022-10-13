import { createContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { TableHead, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import * as accountService from "../../services/admin/AccountService";
import * as degreeService from "../../services/admin/DegreeService";

const StudentCurriculumPage = () => {
  const [user, setUser] = useState([]);
  const [degree, setDegree] = useState([]);

  useEffect(() => {
    accountService.getCurrent().then((response) => {
      setUser(response.data[0][0]);
      let degreeId = response.data[0][10];
      degreeService.getDegreeById(degreeId).then((degree) => {
        setDegree(degree.data);
        console.log(degree.data);
      });
    });
  }, []);
  return (
    <Grid>
      <br />
      <div align="center">
        <strong>{degree.degreeName}</strong>
        <br /> Proposed ({degree.unitsRequired} units)
      </div>
      <br />
      <Box align="center">First Year</Box>
      <br />
      <Grid sx={{ flexGrow: 1 }} container spacing={5}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={10}>
            <Grid item>
              <Paper
                sx={{
                  height: 350,
                  width: 400,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <TableContainer>
                  <Table size="small" aria-label="a dense table">
                    <TableHead align="center">
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>1st Sem</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Course Code</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell>Remark</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Math101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>ENROLLED</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Eng101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>PASSED</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Phy101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>PREREQ:Phy 1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fil101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>PE101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>SPEECH101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>LAB101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="right">TOTAL</TableCell>
                        <TableCell>21</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                sx={{
                  height: 350,
                  width: 400,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <TableContainer>
                  <Table size="small" aria-label="a dense table">
                    <TableHead align="center">
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>2nd Sem</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Course Code</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell>Remark</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Math101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>ENROLLED</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Eng101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>PASSED</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Phy101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>PREREQ:Phy 1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fil101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>PE101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>SPEECH101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>LAB101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="right">TOTAL</TableCell>
                        <TableCell>21</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Box align="center" border={1}>
        2nd Year
      </Box>
      <br />
      <Grid sx={{ flexGrow: 1 }} container spacing={5}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={10}>
            <Grid item>
              <Paper
                sx={{
                  height: 350,
                  width: 400,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <TableContainer>
                  <Table size="small" aria-label="a dense table">
                    <TableHead align="center">
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>1st Sem</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Course Code</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell>Remark</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Math101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>ENROLLED</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Eng101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>PASSED</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Phy101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>PREREQ:Phy 1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fil101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>PE101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>SPEECH101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>LAB101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="right">TOTAL</TableCell>
                        <TableCell>21</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                sx={{
                  height: 350,
                  width: 400,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <TableContainer>
                  <Table size="small" aria-label="a dense table">
                    <TableHead align="center">
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>2nd Sem</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Course Code</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell>Remark</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Math101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>ENROLLED</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Eng101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>PASSED</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Phy101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>PREREQ:Phy 1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fil101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>PE101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>SPEECH101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>LAB101</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="right">TOTAL</TableCell>
                        <TableCell>21</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default StudentCurriculumPage;
