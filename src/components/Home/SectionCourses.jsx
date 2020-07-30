import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { REDUX_ACTIVE_COURSE } from "../../store/CONSTANTS";
import getPost from "../../store/actions/getPost";
import { Scrollbars } from "react-custom-scrollbars";

const SectionCourses = () => {
  const { coursesArr, activeCourse } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleChange = async (item, type) => {
    if (!item.is_blocked) {
      item.type = type;
      await dispatch({ type: REDUX_ACTIVE_COURSE, value: { ...item } });
      await dispatch(getPost(1));
    }
  };
  return (
    <div className="home-courses-container">
      <Scrollbars autoHide autoHeight autoHeightMin={100} autoHeightMax={200}>
        <div className="home-courses-list">
          {coursesArr.map((item, index) => (
            <div
              key={index}
              className={`home-course-item ${item.is_blocked ? "blocked" : ""}`}
            >
              <div className="item-circle">
                <button
                  className={`item-half-circle ${
                    activeCourse.name === item.name && activeCourse.type === 1
                      ? "active"
                      : ""
                  }`}
                  onClick={(_) => handleChange(item, 1)}
                >
                  Lec
                </button>
                <button
                  className={`item-half-circle ${
                    activeCourse.name === item.name && activeCourse.type === 2
                      ? "active"
                      : ""
                  }`}
                  onClick={(_) => handleChange(item, 2)}
                >
                  Sec
                </button>
              </div>
              <p className="item-title" title={item.name}>
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};

export default SectionCourses;
