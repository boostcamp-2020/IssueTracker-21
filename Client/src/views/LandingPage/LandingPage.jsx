import React, { useState } from "react";
import { Link } from "react-router-dom";
import IssueList from "../../components/IssueList";
import Navbar from "Components/Navbar";
import inputDataToUrl from "../../utils/searchRegex";
import axios from "axios";
import "./LandingPageStyle.scss";

export const LandingPageContext = React.createContext();

function LandingPage(props) {
  //input에 입력되는 데이터를 관리
  const [inputData, setInputData] = useState("is:open is:issue");
  //이슈 리스트에 표시될 이슈 데이터를 관리
  const [Issues, setIssues] = useState([]);

  const issueHandler = (issueList) => {
    setIssues(issueList);
  };

  //input에 데이터가 입력될 때 동작
  const inputOnChangeHandler = (e) => {
    setInputData(e.target.value);
  };

  //input에서 엔터키가 눌렸을 때 작동법
  const inputSubmitHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      axios.get(inputDataToUrl(inputData)).then((response) => {
        if (response.data.success) {
          issueHandler(response.data.issues);
        } else {
          alert("Failed to get issues");
        }
      });
    }
  };

  //필터 버튼의 리스트가 눌렸을 때 동작
  const inputOnClickHandler = (e) => {
    setInputData(e.target.id);
  };
  return (
    <LandingPageContext.Provider
      value={{
        inputData,
        Issues,
        issueHandler,
        inputOnChangeHandler,
        inputOnClickHandler,
        inputSubmitHandler,
      }}
    >
      <div id="landingArea">
        <br />
        <h2>이슈잇슈</h2>
        <br />
        <Navbar {...props} />
        <br />
        <IssueList />
        <br />

        <br />
      </div>
    </LandingPageContext.Provider>
  );
}

export default LandingPage;
