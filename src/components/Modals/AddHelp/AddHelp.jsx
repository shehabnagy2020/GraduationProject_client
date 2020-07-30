import React, { useState } from "react";
import addHelp from "../../../store/actions/addHelp";
import { useSelector, useDispatch } from "react-redux";
import * as $ from "jquery";

const AddHelp = () => {
  const [state, setState] = useState({ content: "", subject: "" });
  const { pageLoaders } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const id = e.target.id,
      val = e.target.value;
    setState({ ...state, [id]: val });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addHelp(state, setState));
  };
  const handleClose = (_) => {
    setState({ content: "", subject: "" });
    $("#helpModal").modal("hide");
  };

  return (
    <div className="modal fade" id="helpModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Request Help</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-form-control">
              <input
                type="text"
                placeholder="Enter help subject"
                required
                id="subject"
                onChange={handleChange}
                value={state.subject}
              />
            </div>
            <div className="modal-form-control">
              <textarea
                placeholder="Enter help message content"
                rows="5"
                required
                id="content"
                onChange={handleChange}
                value={state.content}
              />
            </div>
          </div>
          <div className="modal-footer">
            {pageLoaders.addHelp ? (
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

export default AddHelp;
