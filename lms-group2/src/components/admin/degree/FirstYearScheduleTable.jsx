import React, { useContext, useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";
import { AdminContext } from "../../../context/admin/account/adminContext";
import TablePagination from "@mui/material/TablePagination";
import ScheduleIcon from "@mui/icons-material/Schedule";
import * as lectureService from "../../../services/professor/LectureService";

const FirstYearScheduleTable = ({
  degreeId,
  yearNo,
  section,
  isViewSchedule,
}) => {
  const adminContext = useContext(AdminContext);
  const [lecturesByDegree, setLecturesByDegree] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await lectureService.getLecturesByDegree(degreeId);
      console.log(response.data);
      setLecturesByDegree(response.data);

      console.log(lecturesByDegree);
      const tempList = lecturesByDegree.filter((data) => {
        if (data[26] == yearNo && data[11] == section) {
          return data;
        }
      });
      adminContext.onSetScheduleList(tempList);
      return response.data;
    };

    fetchData();
  }, [degreeId, yearNo, section]);

  console.log(adminContext.scheduleList);

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
    rowsPerPage -
    Math.min(
      rowsPerPage,
      adminContext.scheduleList.length - page * rowsPerPage
    );
  return (
    <div style={{ marginTop: "80px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Course Code</TableCell>

              <TableCell align="center">Course Name</TableCell>
              <TableCell align="center">Days</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Units</TableCell>
              <TableCell align="center">Instructor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminContext.scheduleList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((detail) => (
                <TableRow
                  key={detail[0]}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {detail[2]}
                  </TableCell>
                  <TableCell align="center">{detail[3]}</TableCell>
                  <TableCell align="center">
                    {`${detail[12]} & ${detail[13]}`}
                  </TableCell>
                  <TableCell align="center">
                    {`${detail[14]} & ${detail[15]}`}
                  </TableCell>
                  <TableCell align="center">{detail[18]}</TableCell>
                  <TableCell align="center">
                    {`${detail[8]}  ${detail[10]}`}
                  </TableCell>

                  {/* <TableCell align="center">
                    <IconButton>
                      <ScheduleIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        adminContext.onSetIsEdit(true);
                      }}
                      LinkComponent={Link}
                      to={`/admin/degree/${detail.degreeId}/edit`}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell> */}
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
          count={adminContext.scheduleList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default FirstYearScheduleTable;
