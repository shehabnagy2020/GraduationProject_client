import React from "react";
import BackImg from "../../assets/images/pic.jpg";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import StudentImg from "../../assets/images/student.png";
import AssistantImg from "../../assets/images/assistant.png";
import DoctorImg from "../../assets/images/doctor.png";
import { Link } from "react-router-dom";

const PageCode = ({ isRTL, symbol }) => {
  return (
    <>
      <Helmet>
        <title>EA-Study | Choose Type</title>
        <meta charSet="utf-8" />
      </Helmet>
      <main className="form-pages-container">
        <article className="text-container">
          <h1 className="title">EA-study</h1>
          <p className="paragraph">
            a course management system that belongs to el-shorouk academy that
            helps in managing the teaching process
          </p>
          <h2 className="sub-title">choose category</h2>
          <div className="btns-container between">
            <Link to="/login/student">
              <button className="btn img mx-2">
                <img src={StudentImg} className="img-fluid" alt="" />
              </button>
            </Link>
            <Link to="/login/assistant">
              <button className="btn img mx-2">
                <img src={AssistantImg} className="img-fluid" alt="" />
              </button>
            </Link>
            <Link to="/login/doctor">
              <button className="btn img mx-2">
                <img src={DoctorImg} className="img-fluid" alt="" />
              </button>
            </Link>
          </div>
        </article>
        <article className="picture-container">
          <img src={BackImg} alt="" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,64L48,90.7C96,117,192,171,288,197.3C384,224,480,224,576,202.7C672,181,768,139,864,112C960,85,1056,75,1152,80C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </article>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  isRTL: state.isRTL,
  symbol: state.symbol,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageCode);
