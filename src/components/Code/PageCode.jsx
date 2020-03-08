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
        </article>
      </main>
    </>
  );
};

export default PageCode;
