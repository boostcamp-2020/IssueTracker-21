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
  const [inputData, setInputData] = useState("is:open is:issue\u00A0");
  //이슈 리스트에 표시될 이슈 데이터를 관리
  const [Issues, setIssues] = useState([]);
  const [isMounted, setisMounted] = useState(true);
  const [clearBtnStatus, setclearBtnStatus] = useState(false);
  const [InputMilestone, setInputMilestone] = useState(null);
  const [InputAuthor, setInputAuthor] = useState(null);
  const [InputLabel, setInputLabel] = useState([]);
  const [InputAssignee, setInputAssignee] = useState([]);

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
    setInputData("is:open is:issue\u00A0");
    setInputAssignee([]);
    setInputAuthor(null);
    setInputLabel([]);
    setInputMilestone(null);
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
    axios.get(inputDataToUrl(newInputData)).then((response) => {
      if (response.data.success && isMounted) {
        issueHandler(response.data.issues);
      } else {
        alert("Failed to get issues");
      }
    });
    if (newInputData !== "is:open is:issue") setclearBtnStatus(true);
  };

  //양 옆으로 white space가 있는 String을 반환
  const stringWithWhiteSpace = (str) => {
    const whiteSpace = "\u00A0";
    return str.concat(whiteSpace);
  }

  const inputOnClickFilterHandler = (str) => {

    
    const notSelect = str.match(/(?<=no:)[\S]+/g);
    let inputDataCopy = inputData;

    const newAuthor = str.match(/(?<=author:)[\S]+/g);
    const newMilestone = str.match(/(?<=milestone:)[\S\s]+/g);
    const newLabel = str.match(/(?<=label:)[\S]+/g);
    const newAssignee = str.match(/(?<=assignee:)[\S]+/g);

    if(inputDataCopy.match(str) === null){

      if(notSelect != null) {
        switch(notSelect[0]){
          case "label":
            if(InputLabel !== []){
              InputLabel.forEach(e=>inputDataCopy = inputDataCopy.replace(e,''));
            }
            setInputLabel([str]);
            inputDataCopy = inputDataCopy
        .concat(stringWithWhiteSpace(str));
            break;
          case "milestone":
            if(InputMilestone !== null){
              inputDataCopy = inputDataCopy.replace(InputMilestone,'');
            }
            setInputMilestone(str);
            inputDataCopy = inputDataCopy
        .concat(stringWithWhiteSpace(str));
            break;
          case "assignee":
            if(InputAssignee !== []){
              InputAssignee.forEach(e=>inputDataCopy = inputDataCopy.replace(e,''));
            }
            setInputAssignee([str]);
            inputDataCopy = inputDataCopy
        .concat(stringWithWhiteSpace(str));
            break;
        }
      }
  
      if(newMilestone !== null){
        if(InputMilestone !== null){
          inputDataCopy = inputDataCopy.replace(InputMilestone, str);
          setInputMilestone(str);
        }else{
          setInputMilestone(str);
          inputDataCopy = inputDataCopy.concat(stringWithWhiteSpace(str));
        }
      } else if(newAuthor !== null){
        if(InputAuthor !== null){
          inputDataCopy = inputDataCopy.replace(InputAuthor,str);
          setInputAuthor(str);
        }else{
          setInputAuthor(str);
          inputDataCopy = inputDataCopy
        .concat(stringWithWhiteSpace(str));
        }
      } else if(newLabel !== null){
        if(InputLabel.includes("no:label")){
          setInputLabel([str]);
          inputDataCopy = inputDataCopy.replace("no:label\u00A0",'');
        }
        setInputLabel([...InputLabel,str]);
        inputDataCopy = inputDataCopy
        .concat(stringWithWhiteSpace(str));
      } else if (newAssignee !== null){
        if(InputAssignee.includes("no:assignee")){
          setInputAssignee([str]);
          inputDataCopy = inputDataCopy.replace("no:assignee\u00A0",'');
        }
        setInputAssignee([...InputAssignee,str]);
        inputDataCopy = inputDataCopy
        .concat(stringWithWhiteSpace(str));
      }
  
      setInputData(inputDataCopy);
      inputFilterSubmitHandler(inputDataCopy);

    }
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
