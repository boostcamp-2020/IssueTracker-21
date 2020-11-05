import React, { useState } from "react";
import "./IssueHeaderStyle.scss";
import axios from "axios";

function IssueHeader(props) {
  const { issueId, title, isOpened, authorId, createdAt, commentCount } = props;
  const [currentTitle, setCurrentTitle] = useState(title);
  const [newIssueTitle, setNewIssueTitle] = useState(title);

  const dayDiff = (day) => {
    let stDate = new Date();
    let endDate = new Date(day);

    let btMs = endDate.getTime() - stDate.getTime();
    let btDay = btMs / (1000 * 60 * 60 * 24);
    return btDay;
  };

  const editClickHandler = (e) => {
    e.preventDefault();
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
  };

  const titleChangeHandler = (e) => {
    e.preventDefault();
    setNewIssueTitle(e.target.value);
  };

  const cancelClickHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="top">
        <input
          type="text"
          className="title"
          defaultValue={currentTitle}
          onChange={(e) => {
            titleChangeHandler(e);
          }}
        />
        <button
          className="edit"
          onClick={(e) => {
            editClickHandler(e);
          }}
        >
          Edit
        </button>
        <button
          className="save disabled"
          onClick={(e) => {
            saveClickHandler(e);
          }}
        >
          Save
        </button>
        <button
          className="cancel disabled"
          onClick={(e) => cancelClickHandler(e)}
        >
          Cancel
        </button>
      </div>
      <div className="status">
        <button className="isopen">{isOpened ? "Open" : "Closed"}</button>
        <div className="openner">{authorId}</div>
        <p className="openInfo">
          opened this issue {dayDiff(createdAt)} ago {commentCount} comment
        </p>
      </div>
    </div>
  );
}

export default IssueHeader;
