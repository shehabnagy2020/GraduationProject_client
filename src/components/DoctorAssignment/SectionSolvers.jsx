import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector, useDispatch } from "react-redux";
import getAssignmentsSolvers from "../../store/actions/getAssignmentsSolvers";
import ShowAssignment from "../Modals/ShowAssignment/ShowAssignment";
import * as $ from "jquery";

const SectionSolvers = () => {
  const [assignmentSolve, setAssignmentSolve] = useState({});
  const { solversArr, activeAssignment, pageHelpers } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  const fetchData = (_) => {
    dispatch(getAssignmentsSolvers(pageHelpers.AssignmentsSolversPage));
  };

  const handleShowSolve = (item) => {
    setAssignmentSolve(item);
    $("#showAssignmentModal").modal("show");
  };

  return (
    <div className="assignment-right-name" style={{ height: "90vh" }}>
      <h3 className="title">
        {activeAssignment.course_name}{" "}
        {moment(new Date(activeAssignment.date)).format("M-D")}
      </h3>
      {solversArr.data.length >= 1 ? (
        <Scrollbars
          autoHide
          style={{ height: "100%" }}
          renderView={(props) => (
            <div {...props} className="view" id="scroll-solvers" />
          )}
        >
          <InfiniteScroll
            dataLength={solversArr.data.length} //This is important field to render the next data
            next={fetchData}
            hasMore={solversArr.hasMore}
            scrollableTarget="scroll-solvers"
          >
            <div className="row w-100">
              {solversArr.data.map((item, index) => (
                <div
                  key={index}
                  className="col-md-6 col-lg-4"
                  onClick={(_) => handleShowSolve(item)}
                >
                  <div className="assignment-name">
                    <p className="assignment-solver-text">Name: {item.name}</p>
                    <p className="assignment-solver-text">Code: {item.code}</p>
                    <p className="assignment-solver-text">
                      Mark:{" "}
                      {item.mark ? (
                        item.mark
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
          <p>This assignment not solved by any one yet</p>
        </div>
      )}
      <ShowAssignment solve={assignmentSolve} />
    </div>
  );
};

export default SectionSolvers;
