import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import Auth from "./hoc/auth";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, true)} />
        <Route path="/register" component={Auth(RegisterPage, false)} />
        <Route path="/login" component={Auth(LoginPage, false)} />
      </Switch>
    </Router>
  );
};
export default App;
