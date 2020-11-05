import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import IssueHeader from "../../components/IssueHeader";
import axios from "axios";
import loadingImg from "../../../public/loading.gif";
import IssueContent from "../../components/IssueComment";

import "./DetailPageStyle.scss";
import IssueComment from "../../components/IssueComment";

function DetailPage(props) {
  const { params } = props.match;
  const [issueData, setIssueData] = useState({
    issueDetail: {},
    comments: { rows: [] },
  });
  const [headerLoading, setHeaderLoading] = useState(true);
  const [commentsLoading, setCommentLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/issue/${params.issueId}`).then(async (response) => {
      if (response.data.success) {
        setIssueData(response.data.issueDetail);
        console.log(response.data);
        setHeaderLoading(false);
      } else {
        alert("Failed to get issues");
      }
    });
  }, []);

  const renderLoading = (
    <div className="emptyList" id="loading">
      <img id="loadingImg" src={loadingImg} alt="loading..." />
    </div>
  );

  const renderIssueHeader = (
    <IssueHeader
      id={issueData.issueDetail.id}
      title={issueData.issueDetail.title}
      isOpen={issueData.issueDetail.isOpened}
      createdAt={issueData.issueDetail.createdAt}
      authorId={issueData.issueDetail.authorId}
      commentCount={issueData.comments.count}
    />
  );

  const renderIssueComment = issueData.comments.rows.map((comment, key) => {
    return (
      <IssueComment
        id={comment.id}
        content={comment.content}
        createdAt={comment.createdAt}
      />
    );
  });

  return (
    <div>
      <Header />
      <div className="issueHeaderArea">
        {headerLoading ? renderLoading : renderIssueHeader}
      </div>
      <div className="issueCommentsArea">
        <IssueComment
          id={issueData.issueDetail.authorId}
          content={issueData.issueDetail.description}
          createdAt={issueData.issueDetail.createdAt}
        />
        {commentsLoading ? renderLoading : renderIssueComment}
      </div>
    </div>
  );
}

export default DetailPage;
