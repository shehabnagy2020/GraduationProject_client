import React, { useEffect, useState } from "react";
import BackImg from "../../assets/images/pic.jpg";
import IconPassword from "../../assets/images/password-icon.png";
import IconEmail from "../../assets/images/email-icon.png";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { VALIDATION } from "../../store/CONSTANTS";
import CircualarProgress from "../Loaders/CircualarProgress";
import { connect } from "react-redux";
import login from "../../store/actions/login";

const PageLogin = ({ match, history, pageErrors, pageLoaders, loginUser }) => {
  let pageID = match.params.id;
  let role_id =
    pageID === "student"
      ? "0"
      : pageID === "assistant"
      ? "1"
      : pageID === "doctor"
      ? "2"
      : "";
  useEffect(_ => {
    if (
      !(pageID === "student" || pageID === "assistant" || pageID === "doctor")
    )
      history.push("/");
  }, []);

  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const [errorState, setErrorState] = useState({
    email: false,
    password: false
  });
  const checkErrors = _ => {
    for (const key in errorState) {
      if (errorState.hasOwnProperty(key)) {
        const element = errorState[key];
        if (element) return false;
      }
    }
    return true;
  };

  const handleInputValidated = e => {
    const id = e.target.id,
      val = e.target.value;
    if (VALIDATION[id].test(val)) {
      setErrorState({ ...errorState, [id]: false });
    } else {
      setErrorState({ ...errorState, [id]: true });
    }
    setState({ ...state, [id]: val });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (checkErrors()) {
      loginUser({ ...state, role_id });
    }
  };

  return (
    <>
      <Helmet>
        <title>EA-Study | Login</title>
        <meta charSet="utf-8" />
      </Helmet>
      <main className="form-pages-container">
        <form className="text-container" onSubmit={handleSubmit}>
          <h1 className="title">login</h1>

          <div className="form-control-container">
            <div className="form-control">
              <img src={IconEmail} alt="" />
              <input
                required
                onChange={handleInputValidated}
                placeholder="Enter your username"
                type="text"
                id="email"
              />
            </div>
            {errorState.email && (
              <div className="text-error">must be like example@example.com</div>
            )}
          </div>
          <div className="form-control-container">
            <div className="form-control">
              <img src={IconPassword} alt="" />
              <input
                required
                onChange={handleInputValidated}
                placeholder="Enter your password"
                type="password"
                id="password"
              />
            </div>
            {errorState.password && (
              <div className="text-error">
                must be 8 characters at least containing numbers and uppercases
              </div>
            )}
          </div>
          <CircualarProgress condition={pageLoaders.login} effect={true}>
            {pageErrors.login === 1 && (
              <div className="text-error">Failed to login</div>
            )}
            {pageErrors.login === 2 && (
              <div className="text-error">Email not exist</div>
            )}
            {pageErrors.login === 3 && (
              <div className="text-error">Password not correct</div>
            )}
            {pageErrors.login === 4 && (
              <div className="text-error">This account is not approved yet</div>
            )}
            <button type="submit" className="btn btn-primary btn-block">
              login
            </button>
          </CircualarProgress>
          <Link to={`/register/${pageID}`} className="text-primary">
            create new account ?
          </Link>
        </form>
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

const mapStateToProps = state => ({
  pageLoaders: state.pageLoaders,
  pageErrors: state.pageErrors
});

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageLogin);
