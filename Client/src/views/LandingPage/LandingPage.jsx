import React, { useState } from "react";
import { Link } from "react-router-dom";
import IssueList from "../../components/IssueList";
import Navbar from "Components/Navbar";
import "./LandingPageStyle.scss";

export const LandingPageContext = React.createContext();

function LandingPage() {
  const [inputData, setInputData] = useState("");

  const inputOnChangeHandler = (e) => {
    setInputData(e.target.value);
  };

  const inputOnClickHandler = (e) => {
    setInputData(e.target.id);
  };

  return (
    <LandingPageContext.Provider
      value={{ inputOnChangeHandler, inputOnClickHandler, inputData }}
    >
      <div id="landingArea">
        <br />
        <h2>이슈잇슈</h2>
        <br />
        <Navbar />
        <br />
        <IssueList inputData={inputData} />
        <br />

        <br />
      </div>
    </LandingPageContext.Provider>
  );
}

export default LandingPage;
