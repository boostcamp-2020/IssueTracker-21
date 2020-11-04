import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import Auth from "./hoc/auth";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, true)} />
        <Route path="/register" component={Auth(RegisterPage, false)} />
        <Route path="/login" component={Auth(LoginPage, false)} />
      </Switch>
    </div>
  );
};
export default App;
