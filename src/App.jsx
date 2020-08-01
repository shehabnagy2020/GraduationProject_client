import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PageCode from "./components/Code/PageCode";
import PageLogin from "./components/Login/PageLogin";
import PageRegsiter from "./components/Register/PageRegsiter";
import PageDoctorAssignment from "./components/DoctorAssignment/PageDoctorAssignment";
import PageStudentAssignment from "./components/StudentAssignment/PageStudentAssignment";
import PageHome from "./components/Home/PageHome";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import PageSpinner from "./components/Loaders/PageSpinner";
import checkToken from "./store/actions/checkToken";
import AddHelp from "./components/Modals/AddHelp/AddHelp";
import PageSavedPosts from "./components/SavedPosts/PageSavedPosts";
import PageProfile from "./components/Profile/PageProfile";
import getCourse from "./store/actions/getCourse";
import getRecentAssignments from "./store/actions/getRecentAssignments";

function App({}) {
  const { pageLoaders, userDetails, isLogged } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect((_) => {
    if (true) {
      document
        .getElementById("main-styles")
        .setAttribute("href", "styles/indexLTR.css");
    } else {
      document
        .getElementById("main-styles")
        .setAttribute("href", "styles/indexRTL.css");
    }
    if (isLogged) {
      // dispatch(checkToken());
    }
  }, []);

  useEffect(() => {
    if (isLogged && userDetails.token) {
      dispatch(getCourse());
      dispatch(getRecentAssignments());
    }
  }, [isLogged, userDetails, userDetails.token]);

  return (
    <>
      {(pageLoaders.getDepartment ||
        pageLoaders.getGradeYear ||
        pageLoaders.checkToken ||
        pageLoaders.getRecentAssignments ||
        pageLoaders.getCourse ||
        pageLoaders.logout ||
        pageLoaders.getInstitute) && <PageSpinner />}
      <ToastContainer />
      <Switch>
        {!isLogged && <Route exact path="/code" component={PageCode} />}

        {!isLogged && <Route exact path="/login/:id" component={PageLogin} />}

        {!isLogged && (
          <Route exact path="/register/student" component={PageRegsiter} />
        )}

        {isLogged && userDetails.role_type !== "student" && (
          <Route exact path="/assignments" component={PageDoctorAssignment} />
        )}

        {isLogged && userDetails.role_type === "student" && (
          <Route exact path="/assignment" component={PageStudentAssignment} />
        )}
        {isLogged && <Route exact path="/profile" component={PageProfile} />}

        {isLogged && <Route exact path="/" component={PageHome} />}
        {isLogged && (
          <Route exact path="/saved-posts" component={PageSavedPosts} />
        )}

        {!isLogged && <Redirect from="*" to="/code" />}
        {isLogged && <Redirect from="*" to="/" />}
        <Route path="*" />
      </Switch>
      <AddHelp />
    </>
  );
}

export default App;
