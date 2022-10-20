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
import Face3Icon from "@mui/icons-material/Face3";

// Service
import { getTotalParent } from "../../../services/admin/DashboardService";

const ParentCard = () => {
  const [totalParent, setTotalParent] = useState(0);

  useEffect(() => {
    getTotalParent().then((response) => {
      setTotalParent(response.data);
    });
  }, []);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              PARENT
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {totalParent}
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
              <Face3Icon />
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
            Registered
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ParentCard;
