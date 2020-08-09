import React, { useState, useRef } from "react";
import * as $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import addAssignment from "../../../store/actions/addAssignment";
import DatePicker from "react-date-picker";

const AddAssignment = () => {
  const [state, setState] = useState({
    content: "",
    course_code: "",
    total_mark: "",
    deadline: new Date(),
    files: [],
    files_name: [],
  });
  const { pageLoaders, userDetails, coursesArr } = useSelector(
    (state) => state
  );
  const ref = useRef(null);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const id = e.target.id,
      val = e.target.value;
    setState({ ...state, [id]: val });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    dispatch(addAssignment(state, setState));
  };

  const handleFileChange = (e) => {
    var files = e.target.files;
    if (files.length >= 1) {
      let files_name = [];
      for (let i = 0; i < files.length; i++) {
        const element = files[i];
        files_name.push(element.name);
      }
      setState({ ...state, files, files_name });
    }
  };

  const deleteFile = (file) => {
    const fileIndex = state.files_name.indexOf(file);
    let files_name = [...state.files_name];
    files_name.splice(fileIndex, 1);
    let files = [];
    for (let i = 0; i < state.files.length; i++) {
      const element = state.files[i];
      if (i === fileIndex) continue;
      files.push(element);
    }
    setState({ ...state, files, files_name });
  };
  const handleClose = (_) => {
    setState({
      content: "",
      course_code: "",
      total_mark: "",
      deadline: "",
      files: [],
      files_name: [],
    });
    $("#addAssignmentModal").modal("hide");
  };

  return (
    <div
      className="modal fade"
      id="addAssignmentModal"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Create Assignment</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-form-control">
              <textarea
                placeholder="Enter the assignment content"
                rows="8"
                required
                id="content"
                onChange={handleChange}
                value={state.content}
              />
            </div>
            <div className="modal-form-control label-inline">
              <label>Course</label>
              <select
                id="course_code"
                onChange={handleChange}
                value={state.course_code}
                required
              >
                <option value="">Choose Course</option>
                {coursesArr.map((item, index) => (
                  <option value={item.code}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="modal-form-control label-inline">
              <label>Total Mark</label>
              <input
                type="number"
                id="total_mark"
                placeholder="Enter mark"
                onChange={handleChange}
                required
                value={state.total_mark}
              />
            </div>
            <div className="modal-form-control label-inline">
              <label>Deadline</label>
              {/* <input
                type="date"
                id="deadline"
                placeholder="Choose Date"
                onChange={handleChange}
                value={state.deadline}
                required
              /> */}
              <DatePicker
                onChange={(deadline) => setState({ ...state, deadline })}
                value={state.deadline}
                format={"yyyy - M - d"}
                required
              />
            </div>
            <div className="model-file-container">
              {state.files_name.map((item, index) => (
                <div key={index} className="model-file">
                  <span>{item}</span>
                  <button onClick={(_) => deleteFile(item)}>
                    <i className="fa fa-close"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer between">
            <div>
              <input
                multiple
                type="file"
                onChange={handleFileChange}
                ref={ref}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="btn ico"
                onClick={(_) => ref.current.click()}
              >
                <i className="fa fa-file"></i>
              </button>
            </div>
            {pageLoaders.addAssignment ? (
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

export default AddAssignment;
