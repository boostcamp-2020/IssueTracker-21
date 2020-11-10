import React, { useState } from "react";

import styled from "styled-components";

import "./MilestoneEditorStyle.scss";

const MileStoneEditorArea = styled.div`
  background-color: white;
`;

const MilestoneLabel = styled.div`
  font-weight: bold;
  font-size: 13px;
  margin: 1%;
`;

const MilestoneInput = styled.input`
  padding: 0.5%;
  width: 40%;
  font-size: 13px;
  font-weight: bold;
  background-color: "#fafbfc";
  color: ${(props) => props.color}
  border-radius: 2.5px;
  border: 1px solid #e1e4e8;
  margin: 1%;
`;

const MilestoneTextArea = styled.textarea`
  width: 60%;
  border-radius: 2.5px;
  background-color: #fafbfc;
  border: 1px solid #e1e4e8;
  margin: 0.5% 1%;
`;

function MilestoneEditor(props) {
  const [dateColor, setDateColor] = useState("black");

  const titleHandler = props.titleHandler;
  const dueDateHandler = props.dueDateHandler;
  const descriptionHandler = props.descriptionHandler;

  function validateDate(e) {
    let date = e.target.value;
    let date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
    if (!date_pattern.test(date)) {
      setDateColor("red");
    } else {
      setDateColor("black");
      dueDateHandler(date);
    }
  }

  return (
    <MileStoneEditorArea id="milestoneEditorArea">
      <div className="titleArea">
        <MilestoneLabel>Title</MilestoneLabel>
        <MilestoneInput
          placeholder="Title"
          color={"#fafbfc"}
          onChange={(e) => titleHandler(e.target.value)}
        />
      </div>
      <div className="dueDateArea">
        <MilestoneLabel>Due date (optional)</MilestoneLabel>
        <MilestoneInput
          placeholder="연도-월-일"
          className={dateColor == "red" ? "redInput" : "blackInput"}
          color={dateColor}
          onChange={(e) => validateDate(e)}
        />
      </div>
      <div className="descriptionArea">
        <MilestoneLabel>Description (optional)</MilestoneLabel>
        <MilestoneTextArea
          onChange={(e) => descriptionHandler(e.target.value)}
        />
      </div>
    </MileStoneEditorArea>
  );
}

export default MilestoneEditor;
