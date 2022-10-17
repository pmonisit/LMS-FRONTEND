import { useContext } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ParentContext } from "../../context/parent/ParentContext";
// import Sidebar from "../../components/shared/Sidebar";
import { Toolbar, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Profile from "../../components/shared/Profile";

const ParentDashboardPage = () => {
  const { user, handleChildInfo } = useContext(ParentContext);
  return (
    <Box sx={{ display: "flex" }}>
      {/* <Sidebar /> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography align="center">
          <strong>Parent Homepage for {user[8]}</strong>
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
            <Profile />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={7.7} xl={9}>
            <Grid
              container
              justifyContent="center"
              component="form"
              marginTop={10}
              marginRight={3}
            >
              <Grid item xs={10} sm={10} md={12} lg={12} xl={11}>
                <Typography marginBottom={3} textAlign="center" variant="h6">
                  <strong>View My Child's</strong>
                </Typography>
                <TableContainer>
                  <Table>
                    <TableBody>
                      {handleChildInfo().map((data) => {
                        return (
                          <TableRow key={data[0]}>
                            <TableCell>
                              {data[2]} {data[4]}
                            </TableCell>
                            <TableCell>
                              <Link to="/parent/child/grades">
                                <p>Grades</p>
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link to="/parent/child/attendance">
                                <p>Attendance</p>
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link to="/parent/child/schedule">
                                <p>Schedule</p>
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link to="/parent/child/curriculum">
                                <p>Curriculum</p>
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ParentDashboardPage;
