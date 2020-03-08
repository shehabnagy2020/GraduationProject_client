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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,224L48,229.3C96,235,192,245,288,213.3C384,181,480,107,576,101.3C672,96,768,160,864,202.7C960,245,1056,267,1152,229.3C1248,192,1344,96,1392,48L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </article>
      </main>
    </>
  );
};

export default PageLogin;
