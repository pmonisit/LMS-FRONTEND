import { useContext } from "react";

import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { EnrolContext } from "../../context/student/EnrolContext";

const StudentDashboardPage = () => {
  const { user } = useContext(EnrolContext);
  return (
    <>
      <strong>Student Homepage for {user.username}</strong>
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
      <br />
      <strong>Announcements</strong>
      <Box sx={{ width: "100%", maxWidth: 1200, border: 1, margin: 4 }}>
        <Typography margin={2}>
          <strong>DEADLINE OF DROPPING AND LOA APPLICATION</strong>
        </Typography>
        <Typography margin={2}>
          The deadline for dropping this semester is on 23 November 2022
          (Wednesday). Note that for non-degree students, your dropping
          application must undergo advising in your home unit/college since
          faculty accounts will not be able to "note" your application in the
          advising step. The deadline for LOA application is on 06 December 2022
          (Tuesday). This includes getting your instructor's consent, having
          your adviser "note"/approve your application, and paying the fees
          indicated in the dropping form/LOA application. For your information
          and guidance.
        </Typography>
      </Box>
    </>
  );
};

export default StudentDashboardPage;
