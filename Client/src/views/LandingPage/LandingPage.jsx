import React from "react";
import { Link } from "react-router-dom";
import IssueList from "../../components/IssueList";
import Navbar from "Components/Navbar";
import "./LandingPageStyle.scss";

function LandingPage() {
  return (
    <div id="landingArea">
      <br />
      <h2>이슈잇슈</h2>
      <br />
      <Navbar />
      <br />
      <IssueList />
      <br />
      <br />
    </div>
  );
}

export default LandingPage;
