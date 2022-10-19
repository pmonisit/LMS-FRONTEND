import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Paper, Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead, TableRow, Box } from "@mui/material";
import { Grid, Toolbar, Tooltip, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as studentLoadService from "../../services/admin/StudentLoadService";
import * as semesterService from "../../services/admin/Semester";

const ParentChildSchedulePage = () => {
  const [currentSem, setCurrentSem] = useState([]);
  const [myChildEnrolledSLoads, setMyChildEnrolledSLoads] = useState([]);

  useEffect(() => {
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
    });
    studentLoadService.getMyChildSchedule().then((response) => {
      setMyChildEnrolledSLoads(response.data);
    });
  }, []);

  const scheduleColumns = [
    { id: "M", label: "Monday", minWidth: 100 },
    { id: "T", label: "Tuesday", minWidth: 100 },
    { id: "W", label: "Wednesday", minWidth: 100 },
    { id: "Th", label: "Thursday", minWidth: 100 },
    { id: "F", label: "Friday", minWidth: 100 },
    { id: "S", label: "Saturday", minWidth: 100 },
    { id: "Su", label: "Sunday", minWidth: 100 },
  ];

  const handleSchedule = () => {
    const sortedSchedule = myChildEnrolledSLoads.sort((a, b) => {
      let aminute = a[6].split(":").map(Number);
      let bminute = b[6].split(":").map(Number);
      return aminute[0] * 60 + aminute[1] - (bminute[0] * 60 + bminute[1]);
    });

    const conflict = (startTime, endTime, startDate, endDate) => {
      let result = false;
      let start = startTime.split(":").map(Number);
      let end = endTime.split(":").map(Number);
      let startMinute = start[0] * 60 + start[1];
      let endMinute = end[0] * 60 + end[1];

      sortedSchedule.map((data) => {
        let datastart = data[6].split(":").map(Number);
        let dataend = data[7].split(":").map(Number);
        let newStartMinute = datastart[0] * 60 + datastart[1];
        let newEndMinute = dataend[0] * 60 + dataend[1];

        if (
          startDate === data[4] ||
          startDate === data[5] ||
          (endDate !== null && (endDate === data[4] || endDate === data[5]))
        ) {
          if (
            (newStartMinute > startMinute && newStartMinute < endMinute) ||
            (newEndMinute > startMinute && newEndMinute < endMinute)
          ) {
            result = true;
          }
        }
      });
      return result;
    };

    return sortedSchedule.map((data) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={data[0]}>
          <TableCell>
            {data[6]} - {data[7]}
          </TableCell>
          {scheduleColumns.map((response) => {
            return (
              <TableCell
                key={response.id}
                sx={{
                  backgroundColor: conflict(data[6], data[7], data[4], data[5])
                    ? "#ef9a9a"
                    : "white",
                }}
              >
                {response.id === data[4]
                  ? data[2] + "-" + data[8]
                  : response.id === data[5]
                  ? data[2] + "-" + data[8]
                  : ""}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  };

  const handleApprovedSchedule = () => {
    return handleSchedule(myChildEnrolledSLoads, true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid>
          <Toolbar />
          <Tooltip title="Back to dashboard">
            <Link to={`/parent/dashboard`}>
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <h3 align="center">
            Approved Schedule for {currentSem.semOrder} AY{" "}
            {currentSem.startingYear} -{currentSem.endingYear}
          </h3>
          <Grid sx={{ flexGrow: 1 }} container spacing={5}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={10}>
                <Grid item>
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer>
                      <Table>
                        <TableHead align="center">
                          <TableRow>
                            <TableCell>Time</TableCell>
                            {scheduleColumns.map((column) => (
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
                        <TableBody>{handleApprovedSchedule()}</TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                  <sub>
                    <i>
                      <span style={{ color: "#ef9a9a" }}>* with conflict</span>
                    </i>
                  </sub>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ParentChildSchedulePage;
