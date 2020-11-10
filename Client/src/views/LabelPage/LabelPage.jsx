import React, { useState } from "react";
import { Link } from "react-router-dom";
import IssueList from "../../components/IssueList";
import LabelList from "../../components/LabelList";
import DropDown from "../../components/DropDown";
import LabelNavBar from "../../components/LabelNavBar";
import styled from "styled-components";

export const LabelPageContext = React.createContext();

function LabelPage() {
  //input에 입력되는 데이터를 관리
  const [inputData, setInputData] = useState("");
  const [displayLabelEditArea, setdisplayLabelEditArea] = useState(false);

  const inputOnChangeHandler = (e) => {
    setInputData(e.target.value);
  };

  const inputOnClickHandler = (e) => {
    setInputData(e.target.id);
  };

  const toggleLabelEditArea = () => {
      if (displayLabelEditArea === true) setdisplayLabelEditArea(false);
      else setdisplayLabelEditArea(true);
  }

  return (
      <LabelPageContext.Provider value={{toggleLabelEditArea}}>
        <div id="landingArea">
            <br />
            <h2>이슈잇슈</h2>
            <br />
            <LabelNavBar />
            <br />
            <LabelList  displayLabelEditArea={displayLabelEditArea}/>
            <br />
            <br />
        </div>
    </LabelPageContext.Provider>
  );
}

export default LabelPage;


