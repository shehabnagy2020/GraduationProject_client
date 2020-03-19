import React from "react";
import { connect } from "react-redux";

const MainSubjectAssginment = ({ isRTL, symbol }) => {
  return (
    <>
      <div className="backdrop" />
      <article className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <span>subject # assignment</span>
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
)(MainSubjectAssginment);
