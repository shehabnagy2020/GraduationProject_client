import React from "react";
import SectionAssignments from "./SectionAssignments";
import SectionSolvers from "./SectionSolvers";
import Header from "../Header/Header";
import PageSpinner from "../Loaders/PageSpinner";
import { useSelector } from "react-redux";
import AddAssignment from "../Modals/AddAssignment/AddAssignment";

const PageDoctorAssignment = () => {
  const { assignmentsArr, pageLoaders } = useSelector((state) => state);
  return (
    <>
      {(pageLoaders.getAssignments ||
        pageLoaders.getAssignmentsSolvers ||
        pageLoaders.deleteAssignment) && <PageSpinner />}
      <Header noMargin={true} noSearch={true} assignmentMenu={true} />
      <button
        className="add-post-btn"
        data-toggle="modal"
        data-target="#addAssignmentModal"
      >
        <i className="fa fa-plus"></i>
      </button>
      <div
        className={`assignment-container ${
          assignmentsArr.data.length < 1 ? "full" : ""
        }`}
        id={assignmentsArr.data.length >= 1 ? "assignment-container" : ""}
      >
        <SectionAssignments />

        <SectionSolvers />
      </div>
      <AddAssignment />
    </>
  );
};

export default PageDoctorAssignment;
