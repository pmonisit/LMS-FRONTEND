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

import { Link } from "react-router-dom";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";
import { AdminContext } from "../../../context/admin/account/adminContext";
import TablePagination from "@mui/material/TablePagination";
import * as prerequisiteService from "../../../services/admin/Prerequisite";

const PrerequisiteListTable = ({ details }) => {
  const adminContext = useContext(AdminContext);
  const [prerequisites, setPrerequisites] = useState([]);

  useEffect(() => {
    const fetchPrerequisite = async () => {
      const res = await prerequisiteService.getPrerequisiteInfo();
      setPrerequisites(res.data);
      console.log(res.data);
    };
    fetchPrerequisite();
  }, []);

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
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Prerequisite Id</TableCell>
            <TableCell align="center">Course</TableCell>
            <TableCell align="center">Prerequisite Course</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((detail) => (
              <TableRow
                key={detail.prerequisiteId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {detail.prerequisiteId}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {prerequisites.map((data) => {
                    if (data[0] == detail.prerequisiteId) {
                      return data[3];
                    }
                  })}
                </TableCell>

                <TableCell align="center">
                  {prerequisites.map((data) => {
                    if (data[0] == detail.prerequisiteId) {
                      return data[6];
                    }
                  })}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      adminContext.onSetIsEditPrerequisite(true);
                    }}
                    LinkComponent={Link}
                    to={`/admin/prerequisite/${detail.prerequisiteId}/edit`}
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

export default PrerequisiteListTable;
