import React from "react";
import { connect } from "react-redux";

const MainBlockUnblock = ({ isRTL, symbol }) => {
  return (
    <>
      <div className="backdrop" />
      <article className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <span>block & unblock</span>
            </div>
            <button className="modal-close-btn">
              <i className="fa fa-close" />
            </button>
          </div>
          <div className="modal-body">
            <div className="border-container p-5 col dark">
              <div className="form-control-label">
                <div>
                  <label>student name</label>
                  <input type="text" />
                </div>
              </div>
              <div className="form-control-label">
                <div>
                  <label>course name</label>
                  <select id="">
                    <option value="">Computer vision</option>
                  </select>
                </div>
              </div>
              <div className="form-control-label">
                <div>
                  <label>block time</label>
                  <select id="">
                    <option value="">1 week</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="btns-container center">
              <div className="btn-group">
                <button className="active">block</button>
                <button>unblock</button>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainBlockUnblock);
