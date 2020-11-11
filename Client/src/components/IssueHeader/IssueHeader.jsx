import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import calcTime from "../../utils/calcTime";

function IssueHeader(props) {
  const { issueId, title, isOpen, authorId, createdAt, commentCount } = props;
  const [currentTitle, setCurrentTitle] = useState(title);
  const [newIssueTitle, setNewIssueTitle] = useState(title);
  const [editClicked, setEditClicked] = useState(false);

  const editClickHandler = (e) => {
    e.preventDefault();
    setNewIssueTitle(currentTitle);
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

  const EditBtnStyle = editClicked ? HideStyle : EditStyle;

  const SaveBtnStyle = editClicked ? SaveStyle : HideStyle;

  const CancelBtnStyle = editClicked ? CancelStyle : HideStyle;

  const OpenCloseBtnStyle = isOpen ? OpenStyle : ClosedStyle;

  return (
    <div>
      <IssueHeaderDiv id="issueHeaderArea">
        {editClicked ? (
          <ClickedTitleStyle
            type="text"
            className="clickedTitle"
            defaultValue={currentTitle}
            onChange={(e) => {
              titleChangeHandler(e);
            }}
          />
        ) : (
          <TitleStyle className="title">
            {currentTitle}
            <IssueIdStyle className="issueId">{"  #" + issueId}</IssueIdStyle>
          </TitleStyle>
        )}

        <EditBtnStyle
          className={editClicked ? "edit hide" : "edit"}
          onClick={(e) => {
            editClickHandler(e);
          }}
        >
          Edit
        </EditBtnStyle>
        <SaveBtnStyle
          className={editClicked ? "save" : "save hide"}
          onClick={(e) => {
            saveClickHandler(e);
          }}
        >
          Save
        </SaveBtnStyle>
        <CancelBtnStyle
          className={editClicked ? "cancel" : "cancel hide"}
          onClick={(e) => cancelClickHandler(e)}
        >
          Cancel
        </CancelBtnStyle>
      </IssueHeaderDiv>
      <StatusDivStyle id="statusArea">
        <OpenCloseBtnStyle className={isOpen ? "isopen open" : "isopen closed"}>
          {isOpen ? "Open" : "Closed"}
        </OpenCloseBtnStyle>
        <OpennerStyle className="openner">{authorId} </OpennerStyle>
        <p className="openInfo">
          opened this issue {calcTime(createdAt)}
          {commentCount} comment
        </p>
      </StatusDivStyle>
      <hr size="2px" width="95%" />
    </div>
  );
}

const IssueHeaderDiv = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 9px;
  padding: 2% 3% 0% 3%;
`;

const EditStyle = styled.button`
  width: 50px;
  height: 25px;
  font-size: 14px;
  border: 1px solid lightgray;
  border-radius: 2.5px;
  color: black;
  background-color: #fafbfc;
`;

const SaveStyle = styled.button`
  width: 50px;
  height: 25px;
  font-size: 14px;
  border: 1px solid lightgray;
  border-radius: 2.5px;
  color: black;
  background-color: #fafbfc;
`;

const CancelStyle = styled.button`
  border: none;
  font-size: 14px;
  background-color: white;
  color: #0063d7;
`;

const HideStyle = styled.button`
  display: none;
`;

const TitleStyle = styled.div`
  display: flex;
  width: 70%;
  font-size: 32px;
  color: black;
  padding: 0;
`;

const IssueIdStyle = styled.p`
  color: gray;
  padding: 0 0 0 1%;
`;

const ClickedTitleStyle = styled.input`
  width: 80%;
  height: 35px;
  font-size: 20px;
  border: 1px solid #777777;
  box-shadow: 0.5px 0.5px 1.5px 1.5px #85cafc;
  padding: 0.5%;
  border-radius: 2.5px;
`;

const StatusDivStyle = styled.div`
  display: flex;
  padding: 1% 2.7% 0% 2.7%;
`;
const IsopenStyle = styled.button`
  font-size: 12px;
  color: white;
  font-weight: bold;
  border-radius: 2.5px;
  border: none;
  margin-right: 1%;
  height: 26px;
`;

const OpenStyle = styled(IsopenStyle)`
  background-color: #2cbe4e;
`;

const ClosedStyle = styled(IsopenStyle)`
  background-color: #cb2431;
`;

const OpennerStyle = styled.div`
  font-weight: bold;
  margin-right: 1%;
`;

export default IssueHeader;
