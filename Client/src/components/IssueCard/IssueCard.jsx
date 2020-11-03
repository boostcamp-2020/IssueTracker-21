import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import calcTime from "../../utils/calcTime";
import "./issueCard.scss";

function IssueCard(props) {
  const {
    title,
    id,
    isOpen,
    milestoneTitle,
    time,
    authorId,
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

  return (
    <Link className="issueLink" to={"/" + id}>
      <div className="issueCard" data-issueid={id}>
        <div id="issueChkBox" onClick={chkBox} className={ChkBox.condition} />

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
