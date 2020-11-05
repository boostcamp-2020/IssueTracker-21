import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import IssueHeader from "../../components/IssueHeader";
import axios from "axios";
import loadingImg from "../../../public/loading.gif";

import "./DetailPageStyle.scss";

function DetailPage(props) {
  const { params } = props.match;
  const [issueData, setIssueData] = useState({ issueDetail: {}, comments: {} });
  const [headerLoaded, setHeaderLoaded] = useState(true);
  const [loadedRight, setLoadedRight] = useState(true);

  useEffect(() => {
    axios.get(`/api/issue/${params.issueId}`).then(async (response) => {
      if (response.data.success) {
        setIssueData(response.data.issueDetail);
        console.log(response.data.issueDetail);
        setHeaderLoaded(false);
      } else {
        setLoadedRight(false);
        alert("Failed to get issues");
      }
    });
  }, []);

  const renderLoading = (
    <div className="emptyList" id="loading">
      <img id="loadingImg" src={loadingImg} alt="loading..." />
    </div>
  );

  const renderNoResult = (
    <div className="emptyList" id="noResult">
      <div id="noResultIcon">❕</div>
      <div id="noResultmsg">No results matched your search.</div>
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

  return (
    <div>
      <Header />
      <div className="issueHeaderArea">
        {headerLoaded ? renderLoading : renderIssueHeader}
      </div>
    </div>
  );
}

export default DetailPage;
