import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAssignments from "../../store/actions/getAssignments";
import getAssignmentsSolvers from "../../store/actions/getAssignmentsSolvers";
import {
  REDUX_ACTIVE_ASSIGNMENT,
  REDUX_PAGE_HELPERS,
  REDUX_ASSIGNMENTS,
} from "../../store/CONSTANTS";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars";
import deleteAssignment from "../../store/actions/deleteAssignment";
import EditAssignment from "../Modals/EditAssignment/EditAssignment";
import { useState } from "react";
import * as $ from "jquery";

const SectionAssignments = () => {
  const { assignmentsArr, activeAssignment, pageHelpers } = useSelector(
    (state) => state
  );

  const [assignmentEdit, setAssignmentEdit] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssignments(1));

    return (_) => {
      dispatch({
        type: REDUX_PAGE_HELPERS,
        value: { assignmentsPage: 1 },
      });
      dispatch({
        type: REDUX_ACTIVE_ASSIGNMENT,
        value: {},
      });
      dispatch({
        type: REDUX_ASSIGNMENTS,
        value: { hasMore: true, data: [] },
      });
    };
  }, []);

  const fetchData = (_) => {
    dispatch(getAssignments(pageHelpers.assignmentsPage));
  };

  const handleChoose = (item) => {
    dispatch({
      type: REDUX_ACTIVE_ASSIGNMENT,
      value: { ...item, fromAssignments: true },
    });
    dispatch(getAssignmentsSolvers(1, item.id));
  };

  const handleEditAssignment = (item) => {
    setAssignmentEdit({ ...item });
    $("#editAssignmentModal").modal("show");
  };

  return (
    <div className="assignment-left-no" style={{ height: "90vh" }}>
      <h3 className="title">Assignments</h3>
      {assignmentsArr.data.length >= 1 ? (
        <Scrollbars
          autoHide
          style={{ height: "100%" }}
          renderView={(props) => (
            <div {...props} className="view" id="scroll-assignments" />
          )}
        >
          <InfiniteScroll
            dataLength={assignmentsArr.data.length} //This is important field to render the next data
            next={fetchData}
            hasMore={assignmentsArr.hasMore}
            scrollableTarget="scroll-assignments"
          >
            {assignmentsArr.data.map((item, index) => (
              <div
                key={index}
                className={`assignment-no ${
                  activeAssignment.id === item.id ? "active" : ""
                }`}
                onClick={(_) => handleChoose(item)}
              >
                <div className="btn-container">
                  <button
                    className="close-btn"
                    onClick={(_) => dispatch(deleteAssignment(item.id))}
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </div>
                <p className="assignment-text">
                  {item.course_name}{" "}
                  {moment(new Date(item.date)).format("DD/MM")}
                </p>
                <p className="assignment-text">
                  Deadline:{" "}
                  {moment(new Date(item.deadline)).format("YYYY-MM-DD")}
                </p>
                <p className="assignment-text">
                  Total marks: {item.total_mark}
                </p>
                <div className="btn-container">
                  <button
                    className="edit-btn"
                    onClick={(_) => handleEditAssignment(item)}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </Scrollbars>
      ) : (
        <div className="empty-container dark mt-5">
          <p>there are no assignments</p>
        </div>
      )}
      <EditAssignment assignment={assignmentEdit} />
    </div>
  );
};

export default SectionAssignments;
