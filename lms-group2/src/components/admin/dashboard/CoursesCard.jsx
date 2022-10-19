import React from "react";

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

const CoursesCard = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              COURSES
            </Typography>
            <Typography color="textPrimary" variant="h4">
              10
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
            Offered
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CoursesCard;
