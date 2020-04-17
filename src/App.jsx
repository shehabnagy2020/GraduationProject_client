import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PageCode from "./components/Code/PageCode";
import PageLogin from "./components/Login/PageLogin";
import PageRegsiter from "./components/Register/PageRegsiter";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import PageSpinner from "./components/Loaders/PageSpinner";

function App({ pageLoaders }) {
  useEffect((_) => {
    if (true) require("./assets/styles/indexLTR.scss");
    else require("./assets/styles/indexRTL.scss");
  }, []);

  return (
    <>
      {(pageLoaders.getDepartment ||
        pageLoaders.getGradeYear ||
        pageLoaders.getInstitute) && <PageSpinner />}
      <ToastContainer />
      <Switch>
        <Route exact path="/code" component={PageCode} />

        <Route exact path="/login/:id" component={PageLogin} />

        <Route exact path="/register/student" component={PageRegsiter} />

        <Redirect from="/" to="/code" />
        <Route path="*" />
      </Switch>
    </>
  );
}

const mapStateToProps = (state) => ({
  pageLoaders: state.pageLoaders,
  pageErrors: state.pageErrors,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
