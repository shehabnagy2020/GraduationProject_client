import React from "react";
import { Switch, Route } from "react-router-dom";
import PageHome from "./components/Home/PageHome";
import Page404 from "./components/404/Page404";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <PageHome />
      </Route>

      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
}

export default App;
