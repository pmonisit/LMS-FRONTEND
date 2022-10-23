import React, { useEffect, useState } from "react";
import * as degreeService from "../../services/professor/LectureService";
import { useParams } from "react-router-dom";
import FirstYearScheduleTable from "../../components/admin/degree/FirstYearScheduleTable";
import YearSelection from "../../components/admin/degree/YearSelection";
import SectionSelection from "../../components/admin/degree/SectionSelection";
import { Button, Grid, Typography } from "@mui/material";

const SchedulePage = () => {
  const params = useParams();
  const [year, setYear] = useState(0);
  const [section, setSection] = useState("");
  const [isViewSchedule, setIsViewSchedule] = useState(false);
  const listOfSection = ["A", "B", "C", "D"];
  const listOfYear = ["First Year", "Second Year", "Third Year", "Fourth Year"];

  return (
    <>
      <Grid container marginTop={15} marginBottom={15} justifyContent="center">
        <Grid item xs={10} sm={10} md={6}>
          <Typography textAlign="center" variant="h5" mb={3} color="primary">
            Degree Schedule
          </Typography>

          <YearSelection
            list={listOfYear}
            onSetForm={setYear}
            label="Year Level"
            value={year}
          />
          <SectionSelection
            list={listOfSection}
            onSetForm={setSection}
            label="Section"
            value={section}
          />
          <FirstYearScheduleTable
            degreeId={params.degreeId}
            yearNo={year}
            section={section}
            isViewSchedule={isViewSchedule}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SchedulePage;
