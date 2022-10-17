import { useState, useEffect } from "react";
import { Toolbar, TableContainer, TableRow, TableCell } from "@mui/material";
import { TableBody, Table, Box, Typography } from "@mui/material";
import Sidebar from "../../components/shared/Sidebar";
import * as accountService from "../../services/admin/AccountService";

const StudentDashboardPage = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    accountService.getCurrent().then((response) => {
      setUser(response.data[0]);
    });
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography>
          <strong>Student Homepage for {user[8]}</strong>
        </Typography>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>
                  {user[4]}, {user[2]}, {user[3]}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Student Number</TableCell>
                <TableCell>{user[9]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Degree</TableCell>
                <TableCell>{user[12]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Toolbar />
        <Typography>
          <strong>Announcements</strong>
        </Typography>
        <Box sx={{ width: "90%", border: 1, margin: 4 }}>
          <Typography margin={2}>
            <strong>DEADLINE OF DROPPING AND LOA APPLICATION</strong>
          </Typography>
          <Typography margin={2}>
            The deadline for dropping this semester is on 23 November 2022
            (Wednesday). Note that for non-degree students, your dropping
            application must undergo advising in your home unit/college since
            faculty accounts will not be able to "note" your application in the
            advising step. The deadline for LOA application is on 06 December
            2022 (Tuesday). This includes getting your instructor's consent,
            having your adviser "note"/approve your application, and paying the
            fees indicated in the dropping form/LOA application. For your
            information and guidance.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentDashboardPage;
