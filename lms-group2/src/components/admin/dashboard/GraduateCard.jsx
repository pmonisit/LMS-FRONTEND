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
import SchoolIcon from "@mui/icons-material/School";

const GraduateCard = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              ALUMNI
            </Typography>
            <Typography color="textPrimary" variant="h4">
              3,000
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
            Graduated
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GraduateCard;
