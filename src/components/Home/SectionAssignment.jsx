import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { REDUX_ACTIVE_ASSIGNMENT } from "../../store/CONSTANTS";
import { useHistory } from "react-router-dom";

const SectionAssignment = () => {
  const { recentAssignmentsArr, activeAssignment } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChoose = (item) => {
    dispatch({
      type: REDUX_ACTIVE_ASSIGNMENT,
      value: { ...item, fromHome: true },
    });
    history.push("/assignments");
  };

  return (
    <div className="home-recent-assignments-container">
      <h3>Recent Assignments</h3>
      {recentAssignmentsArr.length >= 1 ? (
        recentAssignmentsArr.map((item, index) => (
          <button
            key={index}
            className="home-recent-assignments-item"
            onClick={(e) => handleChoose(item)}
          >
            <span className="name">{item.course_name}</span>
            <span className="date">
              {moment(new Date(item.date)).fromNow()}
            </span>
          </button>
        ))
      ) : (
        <div className="empty-container without">
          <p className="small">there are no recent assignments</p>
        </div>
      )}
    </div>
  );
};

export default SectionAssignment;
