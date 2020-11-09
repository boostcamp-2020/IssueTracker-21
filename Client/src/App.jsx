import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import DetailPage from "./views/DetailPage";
import NewIssuePage from "./views/NewIssuePage";
import Header from "./components/Header";
import Auth from "./hoc/auth";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, true)} />
        <Route path="/register" component={Auth(RegisterPage, false)} />
        <Route path="/login" component={Auth(LoginPage, false)} />
        <Route path="/new" component={Auth(NewIssuePage, true)} />
        <Route path="/issues/:issueId" component={Auth(DetailPage, true)} />
      </Switch>
    </Router>
  );
};
export default App;
