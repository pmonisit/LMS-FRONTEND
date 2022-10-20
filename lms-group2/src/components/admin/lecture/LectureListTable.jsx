import React, { useContext, useState } from "react";
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
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const LectureListTable = ({ details }) => {
  console.log(details);
  const adminContext = useContext(AdminContext);

  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, details.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Course</TableCell>
            <TableCell align="center">Section</TableCell>
            <TableCell align="center">Degree</TableCell>
            <TableCell align="center">Professor Name</TableCell>

            <TableCell align="center">Semester</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((detail) => {
            <TableRow
              key={detail.lectureId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {detail.courseId}
              </TableCell>

              <TableCell component="th" scope="row" align="center">
                {detail.section}
              </TableCell>

              <TableCell component="th" scope="row" align="center">
                For Development
              </TableCell>
            </TableRow>;
          })}
        </TableBody>
      </Table>
    </TableContainer>

    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell align="center">Course</TableCell>
    //         <TableCell align="center">Section</TableCell>
    //         <TableCell align="center">Degree</TableCell>
    //         <TableCell align="center">Professor Name</TableCell>

    //         <TableCell align="center">Semester</TableCell>
    //         <TableCell align="center">Actions</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {details
    //         // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //         .map((detail) => (
    //           <TableRow
    //             key={detail.lectureId}
    //             sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //           >
    //             <TableCell component="th" scope="row" align="center">
    //               {detail.courseId}
    //             </TableCell>
    //             <TableCell component="th" scope="row" align="center">
    //               {detail.section}
    //             </TableCell>
    //             <TableCell component="th" scope="row" align="center">
    //               For Development
    //             </TableCell>
    //             <TableCell align="center">
    //               For development
    //               {/* {detail[8] !== "PROF PLACEHOLDER" ? (
    //                 `${detail[8]} ${detail[10]}`
    //               ) : (
    //                 <Button
    //                   variant="outlined"
    //                   startIcon={<AddIcon />}
    //                   LinkComponent={Link}
    //                   to={`/admin/lecture/${detail[0]}/add-professor`}
    //                 >
    //                   Add Professor
    //                 </Button>
    //               )} */}
    //             </TableCell>
    //             <TableCell align="center">{detail.semesterId}</TableCell>

    //             <TableCell align="center">
    //               <IconButton
    //                 LinkComponent={Link}
    //                 to={`/admin/lecture-details/${detail.lectureId}`}
    //               >
    //                 <ArrowForwardIcon />
    //               </IconButton>
    //               <IconButton
    //                 onClick={() => {
    //                   adminContext.onSetIsEditSemester(true);
    //                 }}
    //                 LinkComponent={Link}
    //                 to={`/admin/lecture/${detail.lectureId}/edit`}
    //               >
    //                 <EditIcon />
    //               </IconButton>
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       {emptyRows > 0 && (
    //         <TableRow
    //           style={{
    //             height: 73 * emptyRows,
    //           }}
    //         >
    //           <TableCell colSpan={6} />
    //         </TableRow>
    //       )}
    //     </TableBody>
    //   </Table>
    //   <TablePagination
    //     rowsPerPageOptions={[5, 10, 15]}
    //     component="div"
    //     count={details.length}
    //     rowsPerPage={rowsPerPage}
    //     page={page}
    //     onPageChange={handleChangePage}
    //     onRowsPerPageChange={handleChangeRowsPerPage}
    //   />
    // </TableContainer>

    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell align="center">Course</TableCell>
    //         <TableCell align="center">Section</TableCell>
    //         <TableCell align="center">Degree</TableCell>
    //         <TableCell align="center">Professor Name</TableCell>

    //         <TableCell align="center">Semester</TableCell>
    //         <TableCell align="center">Actions</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {details
    //         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //         .map((detail) => (
    //           <TableRow
    //             key={detail[0]}
    //             sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //           >
    //             <TableCell component="th" scope="row" align="center">
    //               {detail[3]}
    //             </TableCell>
    //             <TableCell component="th" scope="row" align="center">
    //               {detail[11]}
    //             </TableCell>
    //             <TableCell component="th" scope="row" align="center">
    //               {detail[5]}
    //             </TableCell>
    //             <TableCell align="center">
    //               {detail[8] !== "PROF PLACEHOLDER" ? (
    //                 `${detail[8]} ${detail[10]}`
    //               ) : (
    //                 <Button
    //                   variant="outlined"
    //                   startIcon={<AddIcon />}
    //                   LinkComponent={Link}
    //                   to={`/admin/lecture/${detail[0]}/add-professor`}
    //                 >
    //                   Add Professor
    //                 </Button>
    //               )}
    //             </TableCell>
    //             <TableCell align="center">{detail[23]}</TableCell>

    //             <TableCell align="center">
    //               <IconButton
    //                 LinkComponent={Link}
    //                 to={`/admin/lecture-details/${detail[0]}`}
    //               >
    //                 <ArrowForwardIcon />
    //               </IconButton>
    //               <IconButton
    //                 onClick={() => {
    //                   adminContext.onSetIsEditSemester(true);
    //                 }}
    //                 LinkComponent={Link}
    //                 to={`/admin/lecture/${detail[0]}/edit`}
    //               >
    //                 <EditIcon />
    //               </IconButton>
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       {emptyRows > 0 && (
    //         <TableRow
    //           style={{
    //             height: 73 * emptyRows,
    //           }}
    //         >
    //           <TableCell colSpan={6} />
    //         </TableRow>
    //       )}
    //     </TableBody>
    //   </Table>
    //   <TablePagination
    //     rowsPerPageOptions={[5, 10, 15]}
    //     component="div"
    //     count={details.length}
    //     rowsPerPage={rowsPerPage}
    //     page={page}
    //     onPageChange={handleChangePage}
    //     onRowsPerPageChange={handleChangeRowsPerPage}
    //   />
    // </TableContainer>
  );
};

export default LectureListTable;
