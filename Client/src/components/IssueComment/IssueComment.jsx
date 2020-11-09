import React, { useState } from "react";
import axios from "axios";

import "./IssueCommentStyle.scss";
import calcTime from "../../utils/calcTime";

import styled from "styled-components";

import CommentEditor from "../CommentEditor";

const ContainerDiv = styled.div``;
const CommentDiv = styled.div``;
const VerticalDiv = styled.div``;

function IssueComment(props) {
  const { id, issueId, authorId, owner, content, createdAt } = props;

  const [contentValue, setContentValue] = useState(content);
  const [isEditClicked, setIsEditClicked] = useState(false);

  const editClickHandler = (e) => {
    e.preventDefault();
    setIsEditClicked(true);
  };

  const cancelClickHandler = (e) => {
    e.preventDefault();
    setIsEditClicked(false);
  };

  const submitClickHandler = (value) => {
    let data = {
      commentId: id,
      issueId: issueId,
      content: value,
      authorId: authorId,
    };
    axios
      .put("../api/comment", data, {
        "Content-Type": "application/json",
        withCredentials: true,
        credentials: "include",
      })
      .then((changedIssue) => {
        setContentValue(value);
        setIsEditClicked(false);
      });
  };

  return (
    <ContainerDiv id="containerArea">
      <CommentDiv id="commentArea" className="comment">
        <div className="profile">
          <img src="" alt="이미지" className="userProfile" />
        </div>
        <div className="content">
          <div className={authorId == owner ? "top" : "otherTop"}>
            <div className="commentorArea">
              <div className="commentor">{authorId}</div>
              <div className="commentInfo">commented {calcTime(createdAt)}</div>
            </div>
            <button className={owner == authorId ? "Owner" : "Owner disabled"}>
              Owner
            </button>
            <div className="imogi">&#128008;</div>
            <button
              className={owner == authorId ? "Owner" : "Owner disabled"}
              onClick={(e) => editClickHandler(e)}
            >
              Edit
            </button>
          </div>
          <div className="contentbody">
            {isEditClicked ? (
              <CommentEditor
                cancelClickHandler={cancelClickHandler}
                submitClickHandler={submitClickHandler}
              />
            ) : (
              contentValue
            )}
          </div>
        </div>
      </CommentDiv>
      <VerticalDiv id="verticalArea"></VerticalDiv>
    </ContainerDiv>
  );
}

export default IssueComment;
