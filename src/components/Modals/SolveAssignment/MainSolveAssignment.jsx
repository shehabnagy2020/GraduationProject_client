import React from "react";
import { connect } from "react-redux";

const MainSolveAssignment = ({ isRTL, symbol }) => {
  return (
    <>
      <div className="backdrop" />
      <article className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <span>Solve Assignment</span>
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
                placeholder="Write a solution"
              ></textarea>
            </div>

            <div className="files-container">
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
            <div className="border-container dark between">
              <button className="btn btn-primary m-0">upload files</button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSolveAssignment);
