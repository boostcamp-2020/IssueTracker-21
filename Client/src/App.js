import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
};
export default App;
