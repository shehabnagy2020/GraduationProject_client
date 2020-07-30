import React, { useState, useRef } from "react";
import * as $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import toggleBlock from "../../../store/actions/toggleBlock";
import getCourseStudents from "../../../store/actions/getCourseStudents";
import getAllCourses from "../../../store/actions/getAllCourses";
import { useEffect } from "react";
import PageSpinner from "../../Loaders/PageSpinner";
import getBlockData from "../../../store/actions/getBlockData";

const BlockUnblock = () => {
  const [state, setState] = useState({
    course_code: "",
    student_code: "",
    block_period: "",
  });
  const {
    pageLoaders,
    allCoursesArr,
    courseStudentsArr,
    blockData,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);
  useEffect(() => {
    if (blockData.is_blocked) {
      setState({ ...state, block_period: blockData.block_period });
    } else setState({ ...state, block_period: "" });
  }, [blockData]);
  const handleChange = async (e) => {
    const id = e.target.id,
      val = e.target.value;
    await setState({ ...state, [id]: val });
    if (id === "course_code" && val) await dispatch(getCourseStudents(val));
    if (id === "student_code" && val && state.course_code)
      await dispatch(
        getBlockData({ course_code: state.course_code, student_code: val })
      );
  };

  const handleClose = (_) => {
    setState({ course_code: "", student_code: "", block_period: "" });
    $("#blockUnblockModal").modal("hide");
  };

  return (
    <div
      className="modal fade"
      id="blockUnblockModal"
      tabIndex="-1"
      role="dialog"
    >
      {(pageLoaders.getAllCourses ||
        pageLoaders.getCourseStudents ||
        pageLoaders.getBlockData) && <PageSpinner />}
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Block & Unblock</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-form-control label-inline">
              <label htmlFor="">choose course</label>
              <select
                id="course_code"
                onChange={handleChange}
                value={state.course_code}
              >
                <option value="">choose course</option>
                {allCoursesArr.map((item, index) => (
                  <option value={item.code}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="modal-form-control label-inline">
              <label htmlFor="">choose student</label>
              <select
                id="student_code"
                onChange={handleChange}
                value={state.student_code}
              >
                <option value="">choose student</option>
                {courseStudentsArr.map((item, index) => (
                  <option value={item.student_code}>{item.student_name}</option>
                ))}
              </select>
            </div>
            <div className="modal-form-control label-inline">
              <label htmlFor="">choose period</label>
              <select
                name=""
                id="block_period"
                onChange={handleChange}
                value={state.block_period}
                required
              >
                <option value="">choose period</option>
                <option value="1">1 day</option>
                <option value="3">3 days</option>
                <option value="7">1 week</option>
                <option value="14">2 weeks</option>
              </select>
            </div>
          </div>
          {blockData.course_code &&
            state.student_code &&
            state.course_code &&
            state.block_period && (
              <div className="modal-footer center">
                {pageLoaders.toggleBlock ? (
                  <div className="spinner-border text-primary mx-2" />
                ) : (
                  <div
                    className="btn-group btn-group-toggle"
                    data-toggle="buttons"
                  >
                    <label
                      className={`btn btn-primary ${
                        blockData.is_blocked === 1 ? "disabled" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        onClick={(_) => dispatch(toggleBlock(state, setState))}
                      />
                      Block
                    </label>
                    <label
                      className={`btn btn-primary ${
                        blockData.is_blocked === 0 ? "disabled" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="options"
                        id="option2"
                        onClick={(_) => dispatch(toggleBlock(state, setState))}
                      />
                      Unblock
                    </label>
                  </div>
                )}
              </div>
            )}
        </form>
      </div>
    </div>
  );
};

export default BlockUnblock;
