import React, { useState, useEffect, useContext } from "react";
import { Box, Paper, TableContainer, Table } from "@mui/material";
import { TableHead, TableBody, TableCell } from "@mui/material";
import { TableRow, TablePagination, TableSortLabel } from "@mui/material";
import { Toolbar, FormControlLabel, Switch } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import * as semesterService from "../../services/admin/Semester";
import { EnrolContext } from "../../context/student/EnrolContext";
import Sidebar from "../shared/Sidebar";
import * as attendanceService from "../../services/professor/AttendanceService";

const AttendanceList = () => {
  const { searchTerm, handleTypeSearch } = useContext(EnrolContext);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("6");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentSem, setCurrentSem] = useState([]);
  const [attendanceCurrentSem, setAttendanceCurrentSem] = useState([]);

  useEffect(() => {
    let attendanceBySem = [];
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
      const semId = response.data.semesterId;
      attendanceService.getAllMyAtttendancePerSem(semId).then((res) => {
        attendanceBySem.push(res.data);
        setAttendanceCurrentSem(...attendanceBySem);
      });
    });
  }, []);

  const columns = [
    { id: "6", label: "Date", minWidth: 100 },
    { id: "4", label: "Time", minWidth: 100 },
    { id: "0", label: "Course\u00a0Code", minWidth: 100 },
    { id: "1", label: "Course\u00a0Name", minWidth: 100 },
    { id: "7", label: "Remarks", minWidth: 100 },
  ];

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead sx={{ backgroundColor: "#ff7961" }}>
        <TableRow>
          {columns.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - attendanceCurrentSem.length)
      : 0;
  const filtered = attendanceCurrentSem.filter((value) => {
    if (searchTerm === undefined) {
      return value;
    } else if (searchTerm == "") {
      return value;
    } else if (value[0].toLowerCase().includes(searchTerm.toLowerCase())) {
      return value;
    } else if (value[1].toLowerCase().includes(searchTerm.toLowerCase())) {
      return value;
    }
  });
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ width: "100%" }}>
          <Toolbar />
          <h2 align="center">
            Attendance List for {currentSem.semOrder} AY{" "}
            {currentSem.startingYear} -{currentSem.endingYear}
          </h2>
          <>{handleTypeSearch()}</>
          <br />
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={attendanceCurrentSem.length}
                />
                <TableBody>
                  {attendanceCurrentSem.length > 0 ? (
                    !filtered.length ? (
                      <TableRow>
                        <TableCell align="center" colSpan={10}>
                          No Match Found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      stableSort(filtered, getComparator(order, orderBy))
                        .map((data) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={data[8]}
                            >
                              <TableCell>{data[6]}</TableCell>
                              <TableCell>
                                {data[4]} - {data[5]}
                              </TableCell>
                              <TableCell>{data[0]}</TableCell>
                              <TableCell>{data[1]}</TableCell>
                              <TableCell>{data[7]}</TableCell>
                            </TableRow>
                          );
                        })
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                    )
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={9}>
                        No Available Attendance.
                      </TableCell>
                    </TableRow>
                  )}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={attendanceCurrentSem.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AttendanceList;
