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
          <button type="submit" className="btn btn-primary btn-block">
            register
          </button>
        </article>
        <article className="picture-container">
          <img src={BackImg} alt="" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,0L48,16C96,32,192,64,288,69.3C384,75,480,53,576,69.3C672,85,768,139,864,181.3C960,224,1056,256,1152,261.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </article>
      </main>
    </>
  );
};

export default PageRegsiter;
