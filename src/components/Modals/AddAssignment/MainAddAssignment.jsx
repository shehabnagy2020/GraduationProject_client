import React from "react";
import { connect } from "react-redux";

const MainAddAssignment = ({ isRTL, symbol }) => {
  return (
    <>
      <div className="backdrop" />
      <article className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <span>add assignment</span>
            </div>
            <button className="modal-close-btn">
              <i className="fa fa-close" />
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-form">
              <textarea
                className="modal-textarea"
                id="assignment"
                rows="5"
              ></textarea>

              <div className="form-control-label">
                <div>
                  <label>Total mark</label>
                  <input type="text" />
                </div>
              </div>
              <div className="form-control-label">
                <div>
                  <label>Total mark</label>
                  <select id="">
                    <option value="">Computer visio</option>
                  </select>
                </div>
              </div>
              <div className="form-control-label">
                <div>
                  <label>Total mark</label>
                  <input type="date" />
                </div>
              </div>
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
            <div className="btns-container dark between">
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

export default connect(mapStateToProps, mapDispatchToProps)(MainAddAssignment);
