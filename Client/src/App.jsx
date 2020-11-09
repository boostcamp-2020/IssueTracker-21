import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import DetailPage from "./views/DetailPage";
import NewIssuePage from "./views/NewIssuePage";
import LabelPage from "./views/LabelPage";

import Auth from "./hoc/auth";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, true)} />
        <Route path="/register" component={Auth(RegisterPage, false)} />
        <Route path="/login" component={Auth(LoginPage, false)} />
        <Route path="/issue/new" component={Auth(NewIssuePage, true)} />
        <Route path="/issues/:issueId" component={Auth(DetailPage, true)} />
        <Route path="/labels" component={Auth(LabelPage, true)} />
      </Switch>
    </Router>
  );
};
export default App;
