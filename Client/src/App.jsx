import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import DetailPage from "./views/DetailPage";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/issues/:issueId" component={DetailPage} />
      </Switch>
    </div>
  );
};
export default App;
