import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import RegisterPage from "./views/RegisterPage";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </div>
  );
};
export default App;
