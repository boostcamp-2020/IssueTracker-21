import React, { useState, useEffect } from "react";
import axios from "axios";

import Sty from "./DetailPageEditorStyle";
import Editor from "../Editor";

function DetailPageEditor(props) {
  const [typed, setTyped] = useState("");

  const [issueOpened, setIssueOpened] = useState(props.isOpened ? true : false);
  const [user, setUser] = useState({});
  const [userLoaded, setUserLoaded] = useState(false);

  const [isMounted, setisMounted] = useState(true);

  const issueId = props.issueId;

  const issueOpenHandler = props.issueOpenHandler;
  const addingInfoHandler = props.addingInfoHandler;

  const typingHandler = (value) => {
    setTyped(value);
  };

  useEffect(() => {
    axios.get("/api/user/userinfo").then((response) => {
      if (response.data.success && isMounted) {
        setUser(response.data.user);
        setUserLoaded(true);
      } else {
        alert("Failed to get assignees");
      }
    });
    return () => {
      setisMounted(false);
    };
  }, []);

  const commentHandelr = (e) => {
    e.preventDefault();

    let data = {
      authorId: user.userId,
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
    setTyped("");
  };

  const CloseBtnStyle = issueOpened ? Sty.CloseIssueStyle : Sty.HiddenStyle;
  const ReOpenBtnStyle = issueOpened ? Sty.HiddenStyle : Sty.ReopenIssueStyle;
  const CommentBtnStyle =
    typed.length == 0 ? Sty.NottypeStyle : Sty.CommentStyle;

  return (
    <Sty.DetailEditorArea id="detailEditorArea">
      {userLoaded ? (
        <Sty.ProfileStyle className="profile">
          <Sty.UserProfileStyle
            src={user.profile}
            alt="이미지"
            className="userProfile"
          />
        </Sty.ProfileStyle>
      ) : (
        <div></div>
      )}
      <Sty.EditorAreaStyle className="editorArea">
        <Editor typingHandler={typingHandler}></Editor>
        <Sty.DetailButtonsStyle id="detailButtons">
          <CloseBtnStyle
            className={issueOpened ? "closeIssue" : "hidden"}
            onClick={() => {
              setIssueOpened(false);
              issueOpenHandler(false);
            }}
          >
            Close issue
          </CloseBtnStyle>
          <ReOpenBtnStyle
            className={issueOpened ? "hidden" : "reopenIssue"}
            onClick={() => {
              setIssueOpened(true);
              issueOpenHandler(true);
            }}
          >
            Reopen issue
          </ReOpenBtnStyle>
          <CommentBtnStyle
            className={typed.length == 0 ? "comment nottype" : "comment"}
            disabled={typed.length == 0 ? true : false}
            onClick={(e) => commentHandelr(e)}
          >
            Comment
          </CommentBtnStyle>
        </Sty.DetailButtonsStyle>
      </Sty.EditorAreaStyle>
    </Sty.DetailEditorArea>
  );
}

export default DetailPageEditor;
