import { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { EnrolContext } from "../../context/student/EnrolContext";
import { Box, Toolbar } from "@mui/material";

const Courses = () => {
  const {
    columns,
    renderEnrolActions,
    lecturesBySem,
    searchTerm,
    handleTypeSearch,
    currentSem,
  } = useContext(EnrolContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      <Toolbar />
      <h3 align="center">
        Enrolment for {currentSem.semOrder} AY {currentSem.startingYear} -
        {currentSem.endingYear}
      </h3>
      <>{handleTypeSearch()}</>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {/* <TableContainer sx={{ maxHeight: 440 }}> */}
        <TableContainer>
          {/* <Table stickyHeader aria-label="sticky table"> */}
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {lecturesBySem
                .filter((value) => {
                  if (searchTerm == "") {
                    return value;
                  } else if (
                    value[3].toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return value;
                  } else if (
                    value[2].toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((lecture) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={lecture[0]}
                    >
                      <TableCell>
                        {lecture[0]}
                        {lecture[2]}
                      </TableCell>
                      <TableCell>{lecture[3]}</TableCell>
                      <TableCell>
                        <i>for</i> {lecture[5]}
                      </TableCell>
                      <TableCell>{lecture[17]}</TableCell>
                      <TableCell>
                        {lecture[11]}
                        {lecture[12]} {lecture[13]}-{lecture[14]}
                      </TableCell>
                      <TableCell>{lecture[10]}</TableCell>
                      <TableCell>
                        {lecture[9]}, {lecture[7]}, {lecture[8]}
                      </TableCell>
                      <TableCell>{lecture[15]}</TableCell>
                      <TableCell>{lecture[16]}</TableCell>
                      <TableCell>
                        {renderEnrolActions(lecture[0], lecture[2])}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={lecturesBySem.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
export default Courses;
