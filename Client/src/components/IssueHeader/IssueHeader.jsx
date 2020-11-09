import React, { useState } from "react";
import "./IssueHeaderStyle.scss";
import axios from "axios";
import styled from "styled-components";

import calcTime from "../../utils/calcTime";

const IssueHeaderDiv = styled.div`
  background-color: white;
`;

const StatusDiv = styled.div`
  display: flex;
`;

function IssueHeader(props) {
  const { issueId, title, isOpened, authorId, createdAt, commentCount } = props;
  const [currentTitle, setCurrentTitle] = useState(title);
  const [newIssueTitle, setNewIssueTitle] = useState(title);
  const [editClicked, setEditClicked] = useState(false);

  const editClickHandler = (e) => {
    e.preventDefault();
    setEditClicked(true);
  };

  const saveClickHandler = (e) => {
    e.preventDefault();
    let data = { issueId: issueId, title: newIssueTitle, authorId: authorId };
    axios
      .put("../api/issue/title", data, {
        "Content-Type": "application/json",
        withCredentials: true,
        credentials: "include",
      })
      .then((changedIssue) => {
        setCurrentTitle(newIssueTitle);
        setNewIssueTitle("");
      });
    setEditClicked(false);
  };

  const titleChangeHandler = (e) => {
    e.preventDefault();
    setNewIssueTitle(e.target.value);
  };

  const cancelClickHandler = (e) => {
    e.preventDefault();
    setNewIssueTitle("");
    setEditClicked(false);
  };

  return (
    <div>
      <IssueHeaderDiv id="issueHeaderArea">
        <input
          type="text"
          className={editClicked ? "clickedTitle" : "title"}
          defaultValue={currentTitle}
          onChange={(e) => {
            titleChangeHandler(e);
          }}
          disabled={editClicked ? false : true}
        />
        <button
          className={editClicked ? "edit hide" : "edit"}
          onClick={(e) => {
            editClickHandler(e);
          }}
        >
          Edit
        </button>
        <button
          className={editClicked ? "save" : "save hide"}
          onClick={(e) => {
            saveClickHandler(e);
          }}
        >
          Save
        </button>
        <button
          className={editClicked ? "cancel" : "cancel hide"}
          onClick={(e) => cancelClickHandler(e)}
        >
          Cancel
        </button>
      </IssueHeaderDiv>
      <StatusDiv id="statusArea">
        <button className="isopen">{isOpened ? "Open" : "Closed"}</button>
        <div className="openner">{authorId}</div>
        <p className="openInfo">
          opened this issue {calcTime(createdAt)}
          {commentCount} comment
        </p>
      </StatusDiv>
    </div>
  );
}

export default IssueHeader;
