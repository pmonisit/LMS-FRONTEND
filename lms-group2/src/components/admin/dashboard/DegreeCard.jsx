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
import SchoolIcon from "@mui/icons-material/School";

// Service
import { getTotalDegree } from "../../../services/admin/DashboardService";

const DegreeCard = () => {
  const [totalDegree, setTotalDegree] = useState(0);

  useEffect(() => {
    getTotalDegree().then((response) => {
      setTotalDegree(response.data);
    });
  }, []);
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              DEGREE
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {totalDegree}
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
              <SchoolIcon />
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

export default DegreeCard;
