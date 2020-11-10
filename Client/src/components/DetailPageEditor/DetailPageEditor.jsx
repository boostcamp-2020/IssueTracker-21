import React, { useState } from "react";
import "./DetailPageStyle.scss";
import axios from "axios";

import styled from "styled-components";

import Editor from "../Editor";

const DetailEditorArea = styled.div``;

const DetailButtons = styled.div``;

function DetailPageEditor(props) {
  const [typed, setTyped] = useState("");

  const [issueOpened, setIssueOpened] = useState(props.isOpened ? true : false);

  const issueId = props.issueId;

  const issueOpenHandler = props.issueOpenHandler;
  const addingInfoHandler = props.addingInfoHandler;

  const typingHandler = (value) => {
    setTyped(value);
  };

  const commentHandelr = (e) => {
    e.preventDefault();
    axios.get("/api/user/userinfo").then((response) => {
      if (response.data.success) {
        let data = {
          authorId: response.data.user.userId,
          issueId: issueId,
          content: typed,
        };
        axios
          .post("/api/comment", data, {
            "Content-Type": "application/json",
            withCredentials: true,
            credentials: "include",
          })
          .then((commentResult) => {
            console.log(commentResult);
            let newComment = commentResult.data.newComment.newComment;
            let comment = {
              id: newComment.id,
              authorId: newComment.authorId,
              content: newComment.content,
              issueId: newComment.issueId,
              createdAt: newComment.createdAt,
            };
            addingInfoHandler(comment);
          });
      } else {
        alert("Failed to get assignees");
      }
    });

    setTyped("");
  };
  return (
    <DetailEditorArea id="detailEditorArea">
      <div className="profile">
        <img src="" alt="이미지" className="userProfile" />
      </div>
      <div className="editorArea">
        <Editor typingHandler={typingHandler}></Editor>
        <DetailButtons id="detailButtons">
          <button
            className={issueOpened ? "closeIssue" : "hidden"}
            onClick={() => {
              setIssueOpened(false);
              issueOpenHandler(false);
            }}
          >
            Close issue
          </button>
          <button
            className={issueOpened ? "hidden" : "reopenIssue"}
            onClick={() => {
              setIssueOpened(true);
              issueOpenHandler(true);
            }}
          >
            Reopen issue
          </button>
          <button
            className={typed.length == 0 ? "comment nottype" : "comment"}
            disabled={typed.length == 0 ? true : false}
            onClick={(e) => commentHandelr(e)}
          >
            Comment
          </button>
        </DetailButtons>
      </div>
    </DetailEditorArea>
  );
}

export default DetailPageEditor;
