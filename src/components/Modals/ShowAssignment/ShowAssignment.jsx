import React, { useState, useRef, useEffect } from "react";
import * as $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import assignMark from "../../../store/actions/assignMark";
import { CDN } from "../../../store/CONSTANTS";

const ShowAssignment = ({ solve }) => {
  const [mark, setMark] = useState("");

  const dispatch = useDispatch();

  const { pageLoaders } = useSelector((state) => state);

  const handleChange = (e) => {
    const val = e.target.value;
    setMark(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      assignMark(
        {
          mark,
          assignment_id: solve.assignment_id,
          student_code: solve.code,
        },
        setMark
      )
    );
  };

  const handleClose = (_) => {
    setMark("");
    $("#showAssignmentModal").modal("hide");
  };

  useEffect(() => {
    if (solve.mark) {
      setMark(solve.mark);
    }
  }, [solve]);

  console.log(solve);

  return (
    <div
      className="modal fade"
      id="showAssignmentModal"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">{solve.name} Assignment</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-form-control">
              <p>{solve.solve_content}</p>
            </div>
            <div className="model-file-container">
              {solve.files &&
                solve.files.map((item, index) => (
                  <div key={index} className="model-file">
                    <span>{item.name}</span>
                    <a href={`${CDN}/${item.data}`} download target="_blank">
                      <i className="fa fa-download"></i>
                    </a>
                  </div>
                ))}
            </div>
          </div>
          <div className="modal-footer between">
            <div className="modal-form-control normal-width label-inline">
              <input
                type="number"
                placeholder="Enter mark"
                onChange={handleChange}
                className="dark"
                value={mark}
              />
              <span>/ {solve.assignment_mark}</span>
            </div>
            {pageLoaders.assignMark ? (
              <div className="spinner-border text-primary mx-2" />
            ) : (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowAssignment;
