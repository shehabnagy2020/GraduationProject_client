import React from "react";
import { connect } from "react-redux";

const MainStduentAssignment = ({ isRTL, symbol }) => {
  return (
    <>
      <div className="backdrop" />
      <article className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <span>student # assignment</span>
            </div>
            <button className="modal-close-btn">
              <i className="fa fa-close" />
            </button>
          </div>
          <div className="modal-body">
            <div className="border-container dark">
              <p className="lead-text">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem,
                nisi rerum est debitis voluptate illo reiciendis quae doloremque
                fuga architecto obcaecati mollitia, blanditiis dignissimos
                impedit itaque, libero veritatis earum error! Lorem ipsum dolor
                sit, amet consectetur adipisicing elit. Autem, nisi rerum est
                debitis voluptate illo reiciendis quae doloremque fuga
                architecto obcaecati mollitia, blanditiis dignissimos impedit
                itaque, libero veritatis earum error! Lorem ipsum dolor sit,
                amet consectetur adipisicing elit. Autem, nisi rerum est debitis
                voluptate illo reiciendis quae doloremque fuga architecto
                obcaecati mollitia, blanditiis dignissimos impedit itaque,
                libero veritatis earum error!
              </p>
            </div>
            <div className="files-container">
              <div className="file-item">
                <span>file #1</span>
                <button>
                  <i className="fa fa-close"></i>
                </button>
              </div>
              <div className="file-item">
                <span>file #1</span>
                <button>
                  <i className="fa fa-close"></i>
                </button>
              </div>
              <div className="file-item">
                <span>file #1</span>
                <button>
                  <i className="fa fa-close"></i>
                </button>
              </div>
            </div>
            <div className="border-container dark between">
              <div className="form-control m-0 s-small">
                <input type="text" placeholder="Total mark" />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainStduentAssignment);
