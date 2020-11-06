import React from "react";

function IssueComment(props) {
  const { id, content, createdAt } = props;

  const dayDiff = (day) => {
    let stDate = new Date();
    let endDate = new Date(day);

    let btMs = endDate.getTime() - stDate.getTime();
    let btDay = btMs / (1000 * 60 * 60 * 24);
    return btDay;
  };

  return (
    <div className="comment">
      <div className="profile">
        <img src="" alt="유저이미지" className="userProfile" />
      </div>
      <div className="content">
        <div className="top">
          <div className="commentor">{id}</div>
          <div className="commentInfo">
            commented {dayDiff(createdAt)} days ago
          </div>
          <button className="Owner">Owner</button>
          <div className="imogi">
            <img src="" alt="이모지" />
          </div>
          <button className="edit">Edit</button>
        </div>
        <div className="contentbody">{content}</div>
      </div>
    </div>
  );
}

export default IssueComment;
