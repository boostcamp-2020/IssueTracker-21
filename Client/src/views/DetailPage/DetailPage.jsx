import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import IssueHeader from "../../components/IssueHeader";
import axios from "axios";
import loadingImg from "../../../public/loading.gif";

import "./DetailPageStyle.scss";
import IssueComment from "../../components/IssueComment";

import Editor from "../../components/Editor";

import styled from "styled-components";

const IssueComponentsDiv = styled.div`
  display: 70%;
`;

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
        setHeaderLoading(false);
        setCommentLoading(false);
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
      issueId={issueData.issueDetail.id}
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
        key={comment.id}
        id={comment.id}
        issueId={issueData.issueDetail.id}
        authorId={comment.authorId}
        owner={issueData.issueDetail.authorId}
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
      <IssueComponentsDiv id="issueComponentsArea">
        {commentsLoading ? (
          renderLoading
        ) : (
          <IssueComment
            id={issueData.issueDetail.authorId}
            issueId={issueData.issueDetail.id}
            authorId={issueData.issueDetail.authorId}
            owner={issueData.issueDetail.authorId}
            content={issueData.issueDetail.description}
            createdAt={issueData.issueDetail.createdAt}
          />
        )}

        {commentsLoading ? renderLoading : renderIssueComment}
        <Editor />
      </IssueComponentsDiv>
    </div>
  );
}

export default DetailPage;
