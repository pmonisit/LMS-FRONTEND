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
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

// Service
import { getTotalCourses } from "../../../services/admin/DashboardService";

const CoursesCard = () => {
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    getTotalCourses().then((response) => {
      setTotalCourses(response.data);
    });
  }, []);
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              COURSES
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {totalCourses}
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
              <AutoStoriesIcon />
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
            Available
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CoursesCard;
