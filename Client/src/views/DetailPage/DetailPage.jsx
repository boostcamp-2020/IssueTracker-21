import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import IssueHeader from "../../components/IssueHeader";
import axios from "axios";
import loadingImg from "../../../public/loading.gif";

import "./DetailPageStyle.scss";
import IssueComment from "../../components/IssueComment";

import DetailPageEditor from "../../components/DetailPageEditor";

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
  const [issueOpened, setIssueOpened] = useState(true);

  const [isMounted, setisMounted] = useState(true);

  const addingInfoHandler = (data) => {
    setIssueData({
      issueDetail: issueData.issueDetail,
      comments: { rows: [...issueData.comments.rows, data] },
    });
  };

  const issueOpenHandler = (value) => {
    axios.get("/api/user/userinfo").then((response) => {
      let authorId = "";
      if (response.data.success) {
        authorId = response.data.userId;
      }
      let data = {
        issueId: issueData.issueDetail.id,
        newStatus: value,
        userId: authorId,
      };
      axios
        .put("/api/issue/status", data, {
          "Content-Type": "application/json",
          withCredentials: true,
          credentials: "include",
        })
        .then((response) => {
          setIssueOpened(value);
        });
    });
  };

  useEffect(() => {
    axios.get(`/api/issue/${params.issueId}`).then(async (response) => {
      if (response.data.success && isMounted) {
        setIssueData(response.data.issueDetail);
        setIssueOpened(response.data.issueDetail.issueDetail.isOpened);
        setHeaderLoading(false);
        setCommentLoading(false);
      } else {
        alert("Failed to get issues");
      }
    });
    return () => {
      setisMounted(false);
    };
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
      isOpen={issueOpened}
      createdAt={issueData.issueDetail.createdAt}
      authorId={issueData.issueDetail.authorId}
      commentCount={issueData.comments.count}
    />
  );

  const renderIssueCommentEditor = (
    <DetailPageEditor
      issueId={issueData.issueDetail.id}
      issueOpenHandler={issueOpenHandler}
      isOpened={issueOpened}
      addingInfoHandler={addingInfoHandler}
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
        {commentsLoading ? renderLoading : renderIssueCommentEditor}
      </IssueComponentsDiv>
    </div>
  );
}

export default DetailPage;
