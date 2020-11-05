import React, { useState } from "react";
import "./IssueHeaderStyle.scss";

function IssueHeader(props) {
  const { title, isOpened, authorId, createdAt, commentCount } = props;

  const dayDiff = (day) => {
    let stDate = new Date();
    let endDate = new Date(day);

    let btMs = endDate.getTime() - stDate.getTime();
    let btDay = btMs / (1000 * 60 * 60 * 24);
    return btDay;
  };

  return (
    <div>
      <input type="text" className="title" defaultValue={title} />
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
