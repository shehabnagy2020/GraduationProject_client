import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PageHome from "./components/Home/PageHome";
import Page404 from "./components/404/Page404";
import PageCode from "./components/Code/PageCode";
import PageLogin from "./components/Login/PageLogin";
import PageRegsiter from "./components/Register/PageRegsiter";

function App() {
  return (
    <Switch>
      <Route exact path="/code">
        <PageCode />
      </Route>

      <Route exact path="/login">
        <PageLogin />
      </Route>

      <Route exact path="/register">
        <PageRegsiter />
      </Route>

      {/* <Route exact path="/">
        <PageHome />
      </Route> */}
      <Redirect from="/" to="/code" />
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
}

export default App;
