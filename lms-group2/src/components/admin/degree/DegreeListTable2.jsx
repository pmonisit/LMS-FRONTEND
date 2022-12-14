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
import { Link, useNavigate } from "react-router-dom";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";
import { AdminContext } from "../../../context/admin/account/adminContext";
import TablePagination from "@mui/material/TablePagination";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const DegreeListTable2 = ({ details }) => {
  const navigate = useNavigate();
  const adminContext = useContext(AdminContext);
  const handleEdit = (detail) => {
    console.log(detail);
  };

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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Degree Code</TableCell>

            <TableCell align="center">Degree Name</TableCell>
            <TableCell align="center">Units Required</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((detail) => (
              <TableRow
                key={detail.degreeId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {detail.degreeCode}
                </TableCell>
                <TableCell align="center">{detail.degreeName}</TableCell>
                <TableCell align="center">{detail.unitsRequired}</TableCell>

                <TableCell align="center">
                  <IconButton
                    // onClick={!open ? handleOpenMenu : handleCloseMenu}
                    LinkComponent={Link}
                    to={`/admin/degree/${detail.degreeId}/schedule`}
                  >
                    <ScheduleIcon />
                    {/* <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem
                        onClick={() => {
                          navigate(
                            `/admin/degree/${detail.degreeId}/schedule/1`
                          );
                        }}
                      >
                        First Year
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate(
                            `/admin/degree/${detail.degreeId}/schedule/2`
                          );
                        }}
                      >
                        Second Year
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate(
                            `/admin/degree/${detail.degreeId}/schedule/3`
                          );
                        }}
                      >
                        Third Year
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate(
                            `/admin/degree/${detail.degreeId}/schedule/4`
                          );
                        }}
                      >
                        Fourth Year
                      </MenuItem>
                    </Menu> */}
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

export default DegreeListTable2;
