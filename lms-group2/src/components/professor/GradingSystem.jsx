import React from "react";

// Material Components
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const GradingSystem = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: 10,
  }));
  return (
    <Grid container justifyContent="center">
      <Grid item xs={8} sm={8} md={8} lg={7.5} xl={5} mt={15}>
        <Card>
          <Typography
            marginTop={2}
            variant="h6"
            color="#b71c1c"
            textAlign="center"
          >
            GRADING SYSTEM
          </Typography>

          <CardContent>
            <Grid container spacing={2} textAlign="center" margin={2}>
              <Item>
                <Chip label="Passed" color="success" />
                <Typography variant="subtitle2" marginTop={2}>
                  1.00 - 97-100% Excellent
                </Typography>
                <Typography variant="subtitle2">
                  1.25 - 94-96% Superior
                </Typography>
                <Typography variant="subtitle2">
                  1.50 - 91-93% Superior
                </Typography>
                <Typography variant="subtitle2">1.75 - 88-90% Good</Typography>
              </Item>

              <Item>
                <Chip label="Passed" color="success" />
                <Typography variant="subtitle2" marginTop={2}>
                  2.00 - 85-87% Very Good
                </Typography>
                <Typography variant="subtitle2">2.25 - 82-84% Good</Typography>
                <Typography variant="subtitle2">2.50 - 79-81% Good</Typography>
                <Typography variant="subtitle2">2.75 - 76-78% Fair</Typography>
                <Typography variant="subtitle2">3.00 - 75% Fair</Typography>
              </Item>
              <Item>
                <Chip label="Conditional" color="warning" />
                <Typography variant="subtitle2" marginTop={2} marginBottom={2}>
                  4.0 - 70-74% Conditional
                </Typography>
              </Item>
              <Item>
                <Chip label="Failed" color="error" />
                <Typography variant="subtitle2" marginTop={2}>
                  5.0 - 69 below Failed
                </Typography>
              </Item>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GradingSystem;
