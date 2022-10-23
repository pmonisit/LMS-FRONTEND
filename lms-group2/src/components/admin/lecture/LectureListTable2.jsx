import React, { useContext, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, useNavigate } from "react-router-dom";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";
import { AdminContext } from "../../../context/admin/account/adminContext";
import TablePagination from "@mui/material/TablePagination";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as lectureService from "../../../services/professor/LectureService";
import { Button } from "@mui/material";

const LectureListTable2 = ({ details }) => {
  const navigate = useNavigate();
  const adminContext = useContext(AdminContext);
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const getLectures = async () => {
      const response = await lectureService.getLecture();

      setLectures(response.data);
    };
    getLectures();
  }, [details]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, details.length - page * rowsPerPage);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Course</TableCell>
            <TableCell align="center">Degree</TableCell>
            <TableCell align="center">Section</TableCell>

            <TableCell align="center">Semester</TableCell>
            <TableCell align="center">Professor</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((detail) => (
              <TableRow
                key={detail.lectureId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {
                    //course Name
                    lectures.map((data) => {
                      if (data[0] === detail.lectureId) {
                        return data[3];
                      }
                    })
                  }
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {
                    //Degree Name
                    lectures.map((data) => {
                      if (data[0] === detail.lectureId) {
                        return data[5];
                      }
                    })
                  }
                </TableCell>
                <TableCell align="center">{detail.section}</TableCell>

                <TableCell align="center">
                  {
                    //Semester
                    lectures.map((data) => {
                      if (data[0] === detail.lectureId) {
                        return data[23];
                      }
                    })
                  }
                </TableCell>

                <TableCell align="center">
                  {
                    //Professor Name
                    detail.accountId === 22 ? (
                      <Button
                        LinkComponent={Link}
                        to={`/admin/lecture/${detail.lectureId}/add-professor`}
                      >
                        Assign
                      </Button>
                    ) : (
                      // detail.accountId
                      lectures.map((data) => {
                        if (data[0] === detail.lectureId) {
                          return `${data[8]} ${data[10]}`;
                        }
                      })
                    )
                  }
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    LinkComponent={Link}
                    to={`/admin/lecture-details/${detail.lectureId}`}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      adminContext.onSetIsEditLecture(true);
                    }}
                    LinkComponent={Link}
                    to={`/admin/lecture/${detail.lectureId}/edit`}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 73 * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={details.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default LectureListTable2;
