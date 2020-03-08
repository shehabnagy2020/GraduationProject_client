import React from "react";
import BackImg from "../../assets/images/pic.jpg";
import IconPassword from "../../assets/images/password-icon.png";
import IconUser from "../../assets/images/user-icon.png";
import { Helmet } from "react-helmet";

const PageLogin = () => {
  return (
    <>
      <Helmet>
        <title>EA-Study | Login</title>
        <meta charSet="utf-8" />
      </Helmet>
      <main className="form-pages-container">
        <article className="text-container">
          <h1 className="title">login</h1>

          <div className="form-control">
            <img src={IconUser} alt="" />
            <input
              placeholder="Enter your username"
              type="text"
              id="username"
            />
          </div>
          <div className="form-control">
            <img src={IconPassword} alt="" />
            <input
              placeholder="Enter your password"
              type="password"
              id="password"
            />
          </div>
          <button type="submit" className="form-btn">
            login
          </button>
        </article>
        <article className="picture-container">
          <img src={BackImg} alt="" />
        </article>
      </main>
    </>
  );
};

export default PageLogin;
