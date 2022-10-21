import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";
import { Grid } from "@mui/material";

const MultiStepper = () => {
  const accountFormContext = useContext(AccountFormContext);
  const steps = accountFormContext.steps;

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={accountFormContext.step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default MultiStepper;
