import React, { useEffect, useState } from "react";
import * as degreeService from "../../services/professor/LectureService";
import { useParams } from "react-router-dom";
import FirstYearScheduleTable from "../../components/admin/degree/FirstYearScheduleTable";
import YearSelection from "../../components/admin/degree/YearSelection";
import SectionSelection from "../../components/admin/degree/SectionSelection";
import { Button } from "@mui/material";

const SchedulePage = () => {
  const params = useParams();
  const [year, setYear] = useState(0);
  const [section, setSection] = useState("");
  const [isViewSchedule, setIsViewSchedule] = useState(false);
  const listOfSection = ["A", "B", "C", "D"];
  const listOfYear = ["First Year", "Second Year", "Third Year", "Fourth Year"];
  console.log(section);
  //   useEffect(() => {
  //     degreeService.getLecturesByDegree(1).then((res) => console.log(res.data));
  //   });
  return (
    <div style={{ marginTop: "80px" }}>
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
      <Button
        onClick={() => {
          setIsViewSchedule(true);
        }}
      >
        View Schedule
      </Button>
      <FirstYearScheduleTable
        degreeId={params.degreeId}
        yearNo={year}
        section={section}
        isViewSchedule={isViewSchedule}
      />
      ;
    </div>
  );
};

export default SchedulePage;
