import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./IssueList.scss";
import IssueCard from "../IssueCard";
import loadingImg from "../../../public/loading.gif";

const MenuStyle = styled.div`
  color: black;
`;

function IssueList() {
  const [ChkBox, setChkBox] = useState(0);
  const [Issues, setIssues] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/issue").then((response) => {
      if (response.data.success) {
        setLoading(false);
        setIssues(response.data.issues.rows);
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

  const renderNoResult = (
    <div className="emptyList" id="noResult">
      <div id="noResultIcon">❕</div>
      <div id="noResultmsg">No results matched your search.</div>
    </div>
  );

  const renderIssueCards = Issues.map((issue, index) => {
    //임시로 4개 카드만 렌더링 되도록 설정
    if (index > 3) {
      return "";
    }

    return (
      <IssueCard
        key={issue.id}
        id={issue.id}
        title={issue.title}
        isOpen={issue.isOpened ? "true" : null}
        time={issue.updatedAt}
        authorId={issue.authorId}
        milestoneTitle={issue.milestone.title}
      />
    );
  });

  function chkBox() {
    if (ChkBox.condition) {
      setChkBox({
        condition: undefined,
      });
    } else {
      setChkBox({
        condition: "checked",
      });
    }
  }

  return (
    <div>
      <MenuStyle id="filterArea">
        <div id="leftMenu">
          <div
            id="issueAllChkBox"
            onClick={chkBox}
            className={ChkBox.condition ? ChkBox.condition : ""}
          />
        </div>

        <div id="rightMenu">
          <div className="optBtn" id="authorOpt">
            Author ▾
          </div>
          <div className="optBtn" id="labelOpt">
            Label ▾
          </div>
          <div className="optBtn" id="milestonesOpt">
            Milestones ▾
          </div>
          <div className="optBtn" id="assigneeOpt">
            Assignee ▾
          </div>
        </div>
      </MenuStyle>
      <div id="issueCardArea">
        {Loading
          ? renderLoading
          : Issues.length === 0
          ? renderNoResult
          : renderIssueCards}
      </div>
    </div>
  );
}

export default IssueList;
