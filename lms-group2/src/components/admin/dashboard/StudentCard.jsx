import React, { useState, useEffect } from "react";

// Material Components
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import WcIcon from "@mui/icons-material/Wc";

import { getTotalStudents } from "../../../services/admin/DashboardService";

const StudentCard = () => {
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    getTotalStudents().then((response) => {
      setTotalStudents(response.data);
    });
  }, []);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              STUDENTS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {totalStudents}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <WcIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography color="textSecondary" variant="caption">
            Enrolled
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
