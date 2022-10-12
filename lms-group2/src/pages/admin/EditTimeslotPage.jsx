import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as adminService from "../../services/admin/AccountService";
import { AdminContext } from "../../context/admin/account/adminContext";
import TimeslotForm from "../../components/admin/timeslot/TimeslotForm";

const EditTimeslotPage = () => {
  const params = useParams();

  const adminContext = useContext(AdminContext);
  const { timeslotId, ...timeslot } = adminContext.timeslotList.find(
    (data) => data.timeslotId === +params.id
  );

  //   useEffect(() => {
  //     console.log("Hello");
  //     console.log(degree);
  //   }, []);
  const timeslotClone = { ...timeslot };
  Object.keys(timeslot).forEach((key) => {
    if (timeslot[key] === null || timeslot[key] === "undefined") {
      timeslotClone[key] = "";
    }
  });

  return (
    <>
      <TimeslotForm initialValue={timeslotClone} timeslotId={timeslotId} />{" "}
    </>
  );
};

export default EditTimeslotPage;
