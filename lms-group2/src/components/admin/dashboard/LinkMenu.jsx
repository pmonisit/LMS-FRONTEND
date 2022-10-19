import React from "react";

import { Button, Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LinkMenu = () => {
  return (
    <Grid container marginTop={5}>
      <Grid item xs={12} sm={12} mb={1} mr={5} ml={5}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Menu Links</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button fullWidth variant="outlined">
              Dashboard
            </Button>
          </AccordionDetails>
          <AccordionDetails>
            <Button fullWidth variant="outlined">
              Admin
            </Button>
          </AccordionDetails>
          <AccordionDetails>
            <Button fullWidth variant="outlined">
              Student
            </Button>
          </AccordionDetails>
          <AccordionDetails>
            <Button fullWidth variant="outlined">
              Faculty
            </Button>
          </AccordionDetails>
          <AccordionDetails>
            <Button fullWidth variant="outlined">
              Parent
            </Button>
          </AccordionDetails>
          <AccordionDetails>
            <Button fullWidth variant="outlined">
              Degree
            </Button>
          </AccordionDetails>
          <AccordionDetails>
            <Button fullWidth variant="outlined">
              Courses
            </Button>
          </AccordionDetails>
          <AccordionDetails>
            <Button fullWidth variant="outlined">
              Lecture
            </Button>
          </AccordionDetails>
          <AccordionDetails>
            <Button fullWidth variant="outlined">
              Pre-Requisite
            </Button>
          </AccordionDetails>
          <AccordionDetails>
            <Button fullWidth variant="outlined">
              Semester
            </Button>
          </AccordionDetails>
          <AccordionDetails>
            <Button fullWidth variant="outlined">
              Timeslot
            </Button>
          </AccordionDetails>
          <AccordionDetails>
            <Button fullWidth variant="outlined">
              Settings
            </Button>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default LinkMenu;
