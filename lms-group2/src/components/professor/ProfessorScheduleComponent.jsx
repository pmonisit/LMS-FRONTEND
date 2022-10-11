// React
import React, { useState, useEffect } from "react";

// Material Components
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";

// Service
import * as lectureService from "../../services/professor/LectureService";

const columns = [
  { field: "id", headerName: "Lecture ID", width: 100 },
  {
    field: "courseName",
    headerName: "Course Name",
    width: 200,
    editable: false,
  },
  {
    field: "schedule",
    headerName: "Schedule",
    width: 150,
    editable: false,
  },
  {
    field: "section",
    headerName: "Section",
    width: 150,
    editable: false,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 150,
    editable: false,
  },
  {
    field: "isCurrent",
    headerName: "Status",
    width: 150,
    editable: false,
  },
];

const ProfessorScheduleComponent = () => {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    lectureService.getLecture().then((response) => {
      //   console.log(response.data[0]);
      setSchedule(response.data);
      //   console.log(schedule[0].accountId);
    });
  }, [schedule]);

  return (
    <Grid container justifyContent="center" component="form" marginTop={4}>
      <Grid item xs={10} sm={10} md={6} lg={6} xl={6}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows=""
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfessorScheduleComponent;
