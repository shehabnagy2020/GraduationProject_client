import React from "react";
import BackImg from "../../assets/images/pic.jpg";
import IconCode from "../../assets/images/code-icon.png";

const PageCode = () => {
  return (
    <main className="form-pages-container">
      <article className="picture-container">
        <img src={BackImg} alt="" />
      </article>
      <article className="text-container">
        <h1 className="title">el-shorouk academy</h1>
        <h2 className="code-text">who are you</h2>
        <div className="input-container">
          <img src={IconCode} alt="" />
          <input placeholder="Code" type="text" id="code" />
        </div>
        <div className="btn-container">
          <button type="submit">enter</button>
        </div>
      </article>
    </main>
  );
};

export default PageCode;
