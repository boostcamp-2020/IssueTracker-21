import React, { useState } from "react";
import { Link } from "react-router-dom";
import IssueList from "../../components/IssueList";
import Navbar from "Components/Navbar";
import "./LandingPageStyle.scss";

function LandingPage() {
  const [Keyword, setKeyword] = useState("");
  const [Input, setInput] = useState("");

  function filterKeywordHandler(keyword) {
    setKeyword(keyword);
    setInput(Input + keyword);
  }

  function inputChangeHandler(inputData) {
    setInput(inputData);
  }

  return (
    <div id="landingArea">
      <br />
      <h2>이슈잇슈</h2>
      <br />
      <Navbar
        filterHandler={filterKeywordHandler}
        inputChangeHandler={inputChangeHandler}
        filter={Keyword}
      />
      <br />
      <IssueList inputData={Input} />
      <br />

      <br />
    </div>
  );
}

export default LandingPage;
