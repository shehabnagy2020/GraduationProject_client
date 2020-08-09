import React, { useEffect, useState } from "react";
import PageSpinner from "../Loaders/PageSpinner";
import { useSelector, useDispatch } from "react-redux";
import {
  REDUX_PAGE_HELPERS,
  REDUX_ACTIVE_ASSIGNMENT,
  REDUX_ASSIGNMENTS,
} from "../../store/CONSTANTS";
import getAssignments from "../../store/actions/getAssignments";
import * as $ from "jquery";
import InfiniteScroll from "react-infinite-scroll-component";
import { Scrollbars } from "react-custom-scrollbars";
import Header from "../Header/Header";
import moment from "moment";
import SolveAssignment from "../Modals/SolveAssignment/SolveAssignment";

const PageStudentAssignment = () => {
  const { assignmentsArr, pageLoaders, pageHelpers } = useSelector(
    (state) => state
  );

  const [assignmentEdit, setAssignmentEdit] = useState({});
  const [availability, setAvailability] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssignments(1, availability));

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
    setAssignmentEdit({ ...item });
    $("#solveAssignmentModal").modal("show");
  };
  const handleChangeType = async (i) => {
    await dispatch({
      type: REDUX_ASSIGNMENTS,
      value: { hasMore: true, data: [] },
    });
    setAvailability(i);
    await dispatch(getAssignments(1, i));
  };
  return (
    <>
      {pageLoaders.getAssignments && <PageSpinner />}
      <Header />
      <div
        className="container assignments-students-container"
        style={{ height: "79vh" }}
      >
        <div className="assignments-header">
          <div className="header-part-one">
            <h2 className="title">Assignments</h2>
            <div></div>
          </div>
          <div className="header-part-two">
            <button
              className={`header-btn ${availability === 0 ? "active" : ""}`}
              onClick={(_) => handleChangeType(0)}
            >
              <span>Available</span>
              <div />
            </button>
            <button
              className={`header-btn ${availability === 1 ? "active" : ""}`}
              onClick={(_) => handleChangeType(1)}
            >
              <span>Delivered</span>
              <div />
            </button>
          </div>
        </div>

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
              <div className="row w-100">
                {availability === 0
                  ? assignmentsArr.data.map((item, index) => (
                      <div className="col-md-6 col-lg-4" key={index}>
                        <div className="assignments-students-item">
                          <p>{item.course_name}</p>
                          <p>
                            Deadline:{" "}
                            {moment(new Date(item.deadline)).format("YYYY-M-D")}
                          </p>
                          <p>Total Marks: {item.total_mark}</p>
                          <button onClick={(_) => handleChoose(item)}>
                            solve
                          </button>
                        </div>
                      </div>
                    ))
                  : assignmentsArr.data.map((item, index) => (
                      <div className="col-md-6 col-lg-4" key={index}>
                        <div className="assignments-students-item without">
                          <p>{item.course_name}</p>
                          <p>
                            Deadline:{" "}
                            {moment(new Date(item.deadline)).format("YYYY-M-D")}
                          </p>
                          <p>
                            Mark:{" "}
                            {item.solution && item.solution.mark ? (
                              item.solution.mark
                            ) : (
                              <span className="text-danger">Not Marked</span>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
            </InfiniteScroll>
          </Scrollbars>
        ) : (
          <div className="empty-container mt-5">
            <p>
              there are no {availability === 1 ? "delivered" : ""} assignments
            </p>
          </div>
        )}
      </div>
      <SolveAssignment
        assignment={assignmentEdit}
        setAssignment={setAssignmentEdit}
      />
    </>
  );
};

export default PageStudentAssignment;
