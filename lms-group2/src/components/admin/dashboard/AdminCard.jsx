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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// Service
import { getTotalAdmin } from "../../../services/admin/DashboardService";

const AdminCard = () => {
  const [totalAdmin, setTotalAdmin] = useState(0);

  useEffect(() => {
    getTotalAdmin().then((response) => {
      setTotalAdmin(response.data);
    });
  }, []);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              ADMIN
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {totalAdmin}
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
              <AdminPanelSettingsIcon />
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
            Assigned
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdminCard;
