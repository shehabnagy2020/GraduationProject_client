import React from "react";
import { connect } from "react-redux";

const MainAddPost = ({ isRTL, symbol }) => {
  return (
    <>
      <div className="backdrop" />
      <article className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <span>create post</span>
            </div>
            <button className="modal-close-btn">
              <i className="fa fa-close" />
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-form b-0">
              <textarea
                className="modal-textarea"
                id="assignment"
                rows="5"
                placeholder="Write the post"
              ></textarea>
            </div>

            <div className="files-container dark">
              <div className="file-item">
                <span>file #1</span>
                <button className="btn-red">
                  <i className="fa fa-close"></i>
                </button>
              </div>
              <div className="file-item">
                <span>file #1</span>
                <button className="btn-red">
                  <i className="fa fa-close"></i>
                </button>
              </div>
              <div className="file-item">
                <span>file #1</span>
                <button className="btn-red">
                  <i className="fa fa-close"></i>
                </button>
              </div>
            </div>
            <div className="btns-container between">
              <div className="d-flex-center">
                <button className="btn mr-1 ico">
                  <i className="fa fa-camera"></i>
                </button>
                <button className="btn m-0 ico">
                  <i className="fa fa-file"></i>
                </button>
              </div>
              <button className="btn btn-primary m-0">submit</button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

const mapStateToProps = state => ({
  isRTL: state.isRTL,
  symbol: state.symbol
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainAddPost);
