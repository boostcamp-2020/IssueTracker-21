import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IssueList from "../../components/IssueList";
import Navbar from "Components/Navbar";
import inputDataToUrl from "../../utils/searchRegex";
import axios from "axios";
import { Icon, InlineIcon } from "@iconify/react";
import xCircleFill24 from "@iconify/icons-octicon/x-circle-fill-24";
import styled from "styled-components";
import "./LandingPageStyle.scss";

export const LandingPageContext = React.createContext();

function LandingPage(props) {
  //input에 입력되는 데이터를 관리
  const [inputData, setInputData] = useState("is:open is:issue");
  //이슈 리스트에 표시될 이슈 데이터를 관리
  const [Issues, setIssues] = useState([]);
  const [isMounted, setisMounted] = useState(true);
  const [clearBtnStatus, setclearBtnStatus] = useState(false);
  const [InputMilestone, setInputMilestone] = useState(null);

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
      console.log(inputDataToUrl(inputData));
      axios.get(inputDataToUrl(inputData)).then((response) => {
        if (response.data.success && isMounted) {
          issueHandler(response.data.issues);
        } else {
          alert("Failed to get issues");
        }
      });
      if (inputData !== "is:open is:issue") setclearBtnStatus(true);
    }
  };

  const clearBtnStatusHandler = () => {
    setclearBtnStatus(false);
    setInputData("is:open is:issue");
    axios.get(inputDataToUrl("is:open is:issue")).then((response) => {
      if (response.data.success && isMounted) {
        issueHandler(response.data.issues);
      } else {
        alert("Failed to get issues");
      }
    });
  };

  //필터 버튼의 리스트가 눌렸을 때 동작
  const inputOnClickHandler = (e) => {
    setInputData(e.target.id);
  };

  //필터 드롭다운 클릭시 자동으로 제출
  const inputFilterSubmitHandler = (newInputData) => {
    //e.preventDefault();
    console.log(inputDataToUrl(newInputData));
    axios.get(inputDataToUrl(newInputData)).then((response) => {
      if (response.data.success && isMounted) {
        issueHandler(response.data.issues);
      } else {
        alert("Failed to get issues");
      }
    });
    if (newInputData !== "is:open is:issue") setclearBtnStatus(true);
  };

  const inputOnClickFilterHandler = (str) => {
    let inputDataCopy = inputData;

    let prevAuthor = inputDataCopy.match(/[author:\S]+/g)[0];

    const newAuthor = str.match(/(?<=author:)[\S]+/g);
    const newMilestone = str.match(/(?<=milestone:)[\S\s]+/g);

    if(newMilestone !== null){
      if(InputMilestone !== null){
        inputDataCopy = inputDataCopy.replace(InputMilestone, str);
        setInputMilestone(str);
      }else{
        setInputMilestone(str);
        inputDataCopy = inputDataCopy
      .concat("\u00A0")
      .concat(str)
      .concat("\u00A0");
      }
    } else if(newAuthor !== null){
      if(prevAuthor !== null){
        inputDataCopy = inputDataCopy.replace(prevAuthor,str);
      }else{
        prevAuthor = str.match(/[author:\S]+/g)[0];
        inputDataCopy = inputDataCopy
      .concat("\u00A0")
      .concat(str)
      .concat("\u00A0");
      }
    } else {
      inputDataCopy = inputDataCopy
      .concat("\u00A0")
      .concat(str)
      .concat("\u00A0");
    }

    setInputData(inputDataCopy);
    inputFilterSubmitHandler(inputDataCopy);
  };


  // useEffect(() => {
  //   return () => {
  //     setisMounted(false);
  //   };
  // });

  return (
    <LandingPageContext.Provider
      value={{
        inputData,
        Issues,
        issueHandler,
        inputOnChangeHandler,
        inputOnClickHandler,
        inputSubmitHandler,
        inputOnClickFilterHandler,
      }}
    >
      <div id="landingArea">
        <br />
        <br />
        <Navbar {...props} />
        <br />
        <div id="clearBtnArea">
          {clearBtnStatus && (
            <ClearBtn onClick={clearBtnStatusHandler}>
              <Icon width={"4%"} icon={xCircleFill24} />
              Clear current search query, filters, and sorts
            </ClearBtn>
          )}
        </div>
        {clearBtnStatus && <br />}
        <IssueList />
        <br />
        <br />
      </div>
    </LandingPageContext.Provider>
  );
}

const ClearBtn = styled.button`
  &:hover {
    color: #0366d6;
  }
  padding: 0px;
  display: flex;
  justify-content: flex-start;
  font-weight: 600;
  border: none;
  background-color: white;
  color: #586069;
`;

export default LandingPage;
