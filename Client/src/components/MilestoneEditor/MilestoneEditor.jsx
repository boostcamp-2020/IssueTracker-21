import React, { useState, useEffect } from "react";

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
  const dateFormHandler = props.dateFormHandler;
  const info = props.info;

  function validateDate(e) {
    let date = e.target.value;
    let date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
    if (!date_pattern.test(date)) {
      dateFormHandler(false);
      setDateColor("red");
    } else {
      dateFormHandler(true);
      setDateColor("black");
      dueDateHandler(date);
    }
  }

  useEffect(() => {
    titleHandler(info.title);
    dueDateHandler(info.dueDate.split("T")[0]);
    descriptionHandler(info.description);
  }, []);

  return (
    <MileStoneEditorArea id="milestoneEditorArea">
      <div className="titleArea">
        <MilestoneLabel>Title</MilestoneLabel>
        <MilestoneInput
          placeholder="Title"
          color={"#fafbfc"}
          defaultValue={info.title}
          onChange={(e) => titleHandler(e.target.value)}
        />
      </div>
      <div className="dueDateArea">
        <MilestoneLabel>Due date (optional)</MilestoneLabel>
        <MilestoneInput
          placeholder="연도-월-일"
          className={dateColor == "red" ? "redInput" : "blackInput"}
          color={dateColor}
          defaultValue={info.dueDate.split("T")[0]}
          onChange={(e) => validateDate(e)}
        />
      </div>
      <div className="descriptionArea">
        <MilestoneLabel>Description (optional)</MilestoneLabel>
        <MilestoneTextArea
          defaultValue={info.description}
          onChange={(e) => descriptionHandler(e.target.value)}
        />
      </div>
    </MileStoneEditorArea>
  );
}

export default MilestoneEditor;
