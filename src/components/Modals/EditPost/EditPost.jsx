import React, { useState, useRef } from "react";
import * as $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import editPost from "../../../store/actions/editPost";
import { useEffect } from "react";
import { post } from "jquery";

const EditPost = ({ post }) => {
  const [state, setState] = useState({
    content: "",
    files: [],
    files_name: [],
  });
  useEffect(() => {
    if (post.id) {
      let files_name = [];
      for (let i = 0; i < post.files.length; i++) {
        const element = post.files[i];
        files_name.push(element.name);
      }
      let { files, ...newPost } = post;
      setState({ ...state, ...newPost, files_name });
    }
  }, [post]);
  const { pageLoaders, userDetails } = useSelector((state) => state);
  const ref = useRef(null);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const id = e.target.id,
      val = e.target.value;
    setState({ ...state, [id]: val });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editPost(state, setState));
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
    setState({ content: "", files: [], files_name: [] });
    $("#editPostModal").modal("hide");
  };
  console.log(state);
  return (
    <div className="modal fade" id="editPostModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Edit Post</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-form-control">
              <textarea
                placeholder="Enter the post content"
                rows="8"
                required
                id="content"
                onChange={handleChange}
                value={state.content}
              />
            </div>
            {userDetails.role_type !== "student" && (
              <div className="model-file-container">
                {state.files_name.map((item, index) => (
                  <div key={index} className="model-file">
                    <span>{item}</span>
                    {state.files.length >= 1 && (
                      <button onClick={(_) => deleteFile(item)}>
                        <i className="fa fa-close"></i>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
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
              {userDetails.role_type !== "student" && (
                <button
                  type="button"
                  className="btn ico"
                  onClick={(_) => ref.current.click()}
                >
                  <i className="fa fa-file"></i>
                </button>
              )}
            </div>
            {pageLoaders.editPost ? (
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

export default EditPost;
