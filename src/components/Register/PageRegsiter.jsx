import React, { useEffect, useState } from "react";
import BackImg from "../../assets/images/pic.jpg";
import IconCode from "../../assets/images/code-icon.png";
import IconEmail from "../../assets/images/email-icon.png";
import IconPhone from "../../assets/images/phone-icon.png";
import IconDepartment from "../../assets/images/department-icon.png";
import IconGrade from "../../assets/images/grade-icon.png";
import IconPassword from "../../assets/images/password-icon.png";
import IconUser from "../../assets/images/user-icon.png";
import { Helmet } from "react-helmet";
import PageSpinner from "../Loaders/PageSpinner";
import { Link } from "react-router-dom";
import { VALIDATION } from "../../store/CONSTANTS";
import CircualarProgress from "../Loaders/CircualarProgress";
import { connect } from "react-redux";
import register from "../../store/actions/register";
import getGradeYear from "../../store/actions/getGradeYear";
import getInstitute from "../../store/actions/getInstitute";
import getDepartment from "../../store/actions/getDepartment";

const PageRegsiter = ({
  pageLoaders,
  pageErrors,
  registerUser,
  departmentGet,
  instituteGet,
  gradeYearGet,
  gradeYearArr,
  instituteArr,
  departmentArr,
}) => {
  let role_id = "0";

  console.log(role_id);

  useEffect((_) => {
    instituteGet();
    gradeYearGet();
  }, []);

  const [state, setState] = useState({
    email: "",
    code: "",
    name: "",
    password: "",
    phone: "",
    grade_year_id: "",
    institute_id: "",
    department_id: "",
  });
  const [errorState, setErrorState] = useState({
    email: false,
    code: false,
    name: false,
    password: false,
    phone: false,
  });
  const checkErrors = (_) => {
    for (const key in errorState) {
      if (errorState.hasOwnProperty(key)) {
        const element = errorState[key];
        if (element) return false;
      }
    }
    return true;
  };

  const handleInputValidated = (e) => {
    const id = e.target.id,
      val = e.target.value;
    if (VALIDATION[id].test(val)) {
      setErrorState({ ...errorState, [id]: false });
    } else {
      setErrorState({ ...errorState, [id]: true });
    }
    setState({ ...state, [id]: val });
  };

  const handleInput = (e) => {
    const id = e.target.id,
      val = e.target.value;

    setState({ ...state, [id]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      let obj = { ...state, role_id, email: state.email.toLowerCase() };
      registerUser(obj);
    }
  };

  const handleInst = (inst) => {
    departmentGet(inst);
  };

  return (
    <>
      <Helmet>
        <title>EA-Study | Register</title>
        <meta charSet="utf-8" />
      </Helmet>
      <main className="form-pages-container">
        <form onSubmit={handleSubmit} className="text-container">
          <h1 className="title">register</h1>

          <div className="form-control-container">
            <div className="form-control">
              <img src={IconCode} alt="" />
              <input
                required
                onChange={handleInputValidated}
                placeholder="Enter your code"
                type="text"
                id="code"
              />
            </div>
            {errorState.code && (
              <div className="text-error">must be numbers only</div>
            )}
          </div>
          <div className="form-control-container">
            <div className="form-control">
              <img src={IconEmail} alt="" />
              <input
                required
                onChange={handleInputValidated}
                placeholder="Enter your email"
                type="email"
                id="email"
              />
            </div>
            {errorState.email && (
              <div className="text-error">must be like example@example.com</div>
            )}
          </div>
          <div className="form-control-container">
            <div className="form-control">
              <img src={IconUser} alt="" />
              <input
                required
                onChange={handleInputValidated}
                placeholder="Enter your name"
                type="text"
                id="name"
              />
            </div>
            {errorState.name && (
              <div className="text-error">
                must be 3 characters at least and special chars allowed
              </div>
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
                must be 8 characters containing numbers and uppercases
              </div>
            )}
          </div>
          <div className="form-control-container">
            <div className="form-control">
              <img src={IconPhone} alt="" />
              <input
                required
                onChange={handleInputValidated}
                placeholder="Enter your phone"
                type="tel"
                id="phone"
              />
            </div>
            {errorState.phone && (
              <div className="text-error">must be numbers only</div>
            )}
          </div>
          <div className="form-control-container">
            <div className="form-control">
              <img src={IconGrade} alt="" />
              <select required onChange={handleInput} id="grade_year_id">
                <option value="">Choose Grade Year</option>
                {gradeYearArr.length >= 1 &&
                  gradeYearArr.map((grade, index) => (
                    <option key={index} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-control-container">
            <div className="form-control">
              <img src={IconDepartment} alt="" />
              <div className="form-select-container">
                <select
                  required
                  onChange={(e) => handleInst(e.target.value)}
                  id="institute_id"
                >
                  <option value="">Choose Institute</option>
                  {instituteArr.length >= 1 &&
                    instituteArr.map((ins, index) => (
                      <option key={index} value={ins.id}>
                        {ins.name}
                      </option>
                    ))}
                </select>
                <select id="department_id" required onChange={handleInput}>
                  <option value="">Choose Department</option>
                  {departmentArr.length >= 1 &&
                    departmentArr.map((dep, index) => (
                      <option key={index} value={dep.id}>
                        {dep.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <CircualarProgress condition={pageLoaders.register} effect={true}>
            {pageErrors.register === 1 && (
              <div className="text-error">Failed to register</div>
            )}
            {pageErrors.register === 2 && (
              <div className="text-error">Code already exist</div>
            )}
            {pageErrors.register === 3 && (
              <div className="text-error">Email already exist</div>
            )}
            {pageErrors.register === 4 && (
              <div className="text-error">Phone already exist</div>
            )}
            <button type="submit" className="btn btn-primary btn-block">
              register
            </button>
          </CircualarProgress>
          <Link to={`/login/student`} className="text-primary">
            have account ?
          </Link>
        </form>
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

const mapStateToProps = (state) => ({
  pageLoaders: state.pageLoaders,
  pageErrors: state.pageErrors,
  gradeYearArr: state.gradeYearArr,
  instituteArr: state.instituteArr,
  departmentArr: state.departmentArr,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (user) => dispatch(register(user)),
  gradeYearGet: (_) => dispatch(getGradeYear()),
  instituteGet: (_) => dispatch(getInstitute()),
  departmentGet: (institute) => dispatch(getDepartment(institute)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageRegsiter);
