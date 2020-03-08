import React from "react";
import BackImg from "../../assets/images/pic.jpg";
import IconEmail from "../../assets/images/email-icon.png";
import IconPhone from "../../assets/images/phone-icon.png";
import IconPassword from "../../assets/images/password-icon.png";
import IconUser from "../../assets/images/user-icon.png";
import { Helmet } from "react-helmet";

const PageRegsiter = () => {
  return (
    <>
      <Helmet>
        <title>EA-Study | Register</title>
        <meta charSet="utf-8" />
      </Helmet>
      <main className="form-pages-container">
        <article className="text-container">
          <h1 className="title">register</h1>

          <div className="form-control">
            <img src={IconEmail} alt="" />
            <input placeholder="Enter your email" type="email" id="email" />
          </div>
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
          <div className="form-control">
            <img src={IconPhone} alt="" />
            <input placeholder="Enter your phone" type="tel" id="phone" />
          </div>
          <button type="submit" className="form-btn">
            register
          </button>
        </article>
        <article className="picture-container">
          <img src={BackImg} alt="" />
        </article>
      </main>
    </>
  );
};

export default PageRegsiter;
