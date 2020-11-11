import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import calcTime from "../../utils/calcTime";
import LabelTag from "../LabelTag";
import Assignee from "../Assignee";
import styled from "styled-components";

function IssueCard(props) {
  const {
    title,
    id,
    isOpen,
    milestoneTitle,
    time,
    authorId,
    comments,
    assignee,
    labels,
    checkHandler,
    checkedAll,
  } = props;

  const [ChkBox, setChkBox] = useState(0);
  const timeData = calcTime(time);

  useEffect(() => {
    setChkBox({
      condition: "chkBox",
    });
    checkedAll(title, setChkBox.bind());
  }, []);

  const chkBox = (e) => {
    e.preventDefault();
    if (ChkBox.condition !== "chkBox") {
      setChkBox({
        condition: "chkBox",
      });
      checkHandler(id, false);
    } else {
      setChkBox({
        condition: "chkBox checked",
      });
      checkHandler(id, true);
    }
  };

  const labelTags = labels.map((label, index) => {
    return (
      <LabelTag key={label.id} labelName={label.name} color={label.color} />
    );
  });

  const CheckStyle =
    ChkBox.condition !== "chkBox checked" ? ChkBoxStyle : CheckedStyle;

  return (
    <Link className="issueLink" to={"/issues/" + id}>
      <IssueLinkStyle>
        <IssueCardStyle className="issueCard" data-issueid={id}>
          <CheckStyle
            id="issueChkBox"
            onClick={chkBox}
            className={ChkBox.condition}
          />

          <IssueContentsStyle className="issueContents">
            <MainInfoStyle className="mainInfo">
              <IconStyle className="icon">{isOpen ? "✅" : "❌"}</IconStyle>
              <IssueTitleStyle className="issueTitle">{title}</IssueTitleStyle>
              <IssueLabel className="issueLabel">{labelTags}</IssueLabel>
            </MainInfoStyle>
            <SubInfoStyle className="subInfo">
              <IssueSubTitleStyle className="issueSubTitle">
                #{id} {isOpen ? "opened" : "closed"} {timeData} by {authorId}{" "}
              </IssueSubTitleStyle>
              <div className="issueMilestone">🗓 {milestoneTitle}</div>
            </SubInfoStyle>
          </IssueContentsStyle>
          <SideContentsStyle className="sideContents">
            <AssigneeInfoStyle className="assigneeInfo">
              {assignee.length !== 0 && (
                <Assignee assignee={assignee}></Assignee>
              )}
            </AssigneeInfoStyle>
            <CommentsInfoStyle className="commentsInfo">
              {comments.length !== 0 && `📧 ${comments.length}`}
            </CommentsInfoStyle>
          </SideContentsStyle>
        </IssueCardStyle>
      </IssueLinkStyle>
    </Link>
  );
}

const IssueLinkStyle = styled.div`
  text-decoration: none;
  color: black;
`;

const IssueCardStyle = styled.div`
  width: 100%;
  padding: 7px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  border: 1px solid rgb(225, 228, 232);
  border-top: 0;

  &:hover {
    background-color: #f6f8fa;
  }
`;

const ChkBoxStyle = styled.div`
  width: 12px;
  height: 12px;
  border: 1px solid black;
  border-radius: 3px;
  cursor: pointer;
`;

const CheckedStyle = styled(ChkBoxStyle)`
  text-align: center;
  color: white;
  font-size: 12px;
  background-color: #3a79fe;
  &:before {
    content: "✔";
  }
`;

const IssueContentsStyle = styled.div`
  width: 70%;
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  justify-content: flex-start;
`;

const MainInfoStyle = styled.div`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-items: center;
  line-height: 22px;
  align-items: center;
`;

const IconStyle = styled.div`
  margin-right: 10px;
`;

const IssueTitleStyle = styled.div`
  margin-right: 20px;
`;

const IssueLabel = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubInfoStyle = styled.div`
  font-size: 13px;
  color: gray;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
`;

const IssueSubTitleStyle = styled.div`
  margin-right: 15px;
`;

const SideContentsStyle = styled.div`
  width: 30%;
  height: auto;
  display: flex;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
`;

const AssigneeInfoStyle = styled.div`
  position: relative;
  height: 30px;
`;

const CommentsInfoStyle = styled.div`
  width: 70px;
`;

export default IssueCard;
