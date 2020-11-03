import React from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import calcTime from "../../utils/calcTime";
import "./issueCard.scss";

function IssueCard(props) {
  const { title, id, isOpen, milestoneTitle, time, authorId } = props;

  const timeData = calcTime(time);

  return (
    <Link className="issueLink" to={"/" + id}>
      <div className="issueCard" data-issueid={id}>
        <div className="issueChkBox">
          <input type="checkbox" id="issueAllChkBox" />
        </div>
        <div className="issueContents">
          <div className="mainInfo">
            <div className="icon">{isOpen ? "✅" : "❌"}</div>
            <div className="issueTitle">{title}</div>
          </div>
          <div className="subInfo">
            <div className="issueSubTitle">
              #{id} {isOpen ? "opened" : "closed"} {timeData} by {authorId}{" "}
            </div>
            <div className="issueMilestone">🗓 {milestoneTitle}</div>
          </div>
        </div>
        <div className="sideContents">
          <div className="assigneeInfo">⚽⚽⚽</div>
          <div className="commentsInfo">✉ 3</div>
        </div>
      </div>
    </Link>
  );
}

export default IssueCard;
