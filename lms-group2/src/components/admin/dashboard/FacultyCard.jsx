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
import Face4Icon from "@mui/icons-material/Face4";

// Service
import { getTotalFaculty } from "../../../services/admin/DashboardService";

const FacultyCard = () => {
  const [totalFaculty, setTotalFaculty] = useState(0);

  useEffect(() => {
    getTotalFaculty().then((response) => {
      setTotalFaculty(response.data);
    });
  }, []);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Faculty
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {totalFaculty}
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
              <Face4Icon />
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
            Members
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FacultyCard;
