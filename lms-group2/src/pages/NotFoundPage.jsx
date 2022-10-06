import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";

const NotFoundPage = () => {
  return (
    <>
      <Grid container spacing={2} justifyContent={"center"} marginTop={3}>
        <Grid item xs={5} marginTop={3} textAlign="center">
          <h1>Page Not Found</h1>
          <Button LinkComponent={Link} to="/">
            Back to Home Page
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFoundPage;
