import React from "react";
import BackImg from "../../assets/images/pic.jpg";
import IconCode from "../../assets/images/code-icon.png";
import { Helmet } from "react-helmet";

const PageCode = () => {
  return (
    <>
      <Helmet>
        <title>EA-Study | Code</title>
        <meta charSet="utf-8" />
      </Helmet>
      <main className="form-pages-container">
        <article className="text-container">
          <h1 className="title">EA-study</h1>
          <p className="paragraph">
            a course management system that belongs to el-shorouk academy that
            helps in managing the teaching process
          </p>
          <div className="form-control">
            <img src={IconCode} alt="" />
            <input placeholder="Enter your code" type="text" id="code" />
          </div>
          <button type="submit" className="form-btn">
            enter
          </button>
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

export default PageCode;
