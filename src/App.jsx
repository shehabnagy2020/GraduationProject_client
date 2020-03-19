import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PageCode from "./components/Code/PageCode";
import PageLogin from "./components/Login/PageLogin";
import PageRegsiter from "./components/Register/PageRegsiter";

function App() {
  useEffect(_ => {
    if (true) require("./assets/styles/indexLTR.scss");
    else require("./assets/styles/indexRTL.scss");
  }, []);

  return (
    <Switch>
      <Route exact path="/code" component={PageCode} />

      <Route exact path="/login" component={PageLogin} />

      <Route exact path="/register" component={PageRegsiter} />

      <Redirect from="/" to="/code" />
      <Route path="*" />
    </Switch>
  );
}

export default App;
