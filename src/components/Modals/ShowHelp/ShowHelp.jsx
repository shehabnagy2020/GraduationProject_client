import React, { useState } from "react";

const ShowHelp = ({ obj }) => {
  return (
    <div className="modal fade" id="showHelpModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{obj.subject}</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-form-control">
              <textarea
                placeholder="Enter help message content"
                value={obj.content}
                rows="5"
                readOnly
              />
            </div>
            <div className="modal-form-control">
              <p className="lead">{obj.solution}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowHelp;
