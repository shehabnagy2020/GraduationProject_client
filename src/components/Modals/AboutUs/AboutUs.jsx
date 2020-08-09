import React, { useState } from "react";
import { useSelector } from "react-redux";

const AboutUs = ({}) => {
  const { pageHelpers } = useSelector((state) => state);
  return (
    <div className="modal fade" id="aboutUsModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">EA-Study</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-items-list">
              <p className="modal-items-list-header">
                our project is a course management system that belongs to
                el-shorouk academy that helps in managing the teaching process
              </p>
            </div>
            <div className="modal-items-list">
              <p className="modal-items-list-header">our team: </p>
              <div className="modal-items-list-content">
                <span>shehab nagy</span>
                <span>shorouk gamal</span>
                <span>saad tarek</span>
                <span>george nessem</span>
                <span>El-Saeed El-Hoseny</span>
                <span>Abd El-Rahman Anany</span>
              </div>
            </div>
            <div className="modal-items-list">
              <p className="modal-items-list-header">our doctor: </p>
              <div className="modal-items-list-content">
                <span>Dr.Mohamed Mostafa</span>
              </div>
            </div>
            <div className="modal-items-list">
              <p className="modal-items-list-header">our teacher assistant: </p>
              <div className="modal-items-list-content">
                <span>aya mahmoud</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
