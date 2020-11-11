import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import LoginPage from "./views/LoginPage";
import DetailPage from "./views/DetailPage";
import NewIssuePage from "./views/NewIssuePage";
import Header from "./components/Header";
import LabelPage from "./views/LabelPage";
import MilestonePage from "./views/MilestonePage";

import MilestoneAddPage from "./views/MilestoneAddPage";
import MilestoneModifyPage from "./views/MilestoneModifyPage";

import Auth from "./hoc/auth";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, true)} />
        <Route path="/login" component={Auth(LoginPage, false)} />
        <Route path="/new" component={Auth(NewIssuePage, true)} />
        <Route path="/issues/:issueId" component={Auth(DetailPage, true)} />
        <Route path="/labels" component={Auth(LabelPage, true)} />
        <Route
          path="/milestone/:milestoneId"
          component={Auth(MilestoneModifyPage, true)}
        />
        <Route path="/milestone" component={Auth(MilestonePage, true)} />
        <Route path="/newmilestone" component={Auth(MilestoneAddPage, true)} />
      </Switch>
    </Router>
  );
};
export default App;
