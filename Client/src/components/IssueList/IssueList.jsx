import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./IssueList.scss";
import IssueCard from "../IssueCard";
import loadingImg from "../../../public/loading.gif";
import { LandingPageContext } from "../../views/LandingPage";

const MenuStyle = styled.div`
  color: black;
`;

let items = new Map();

function IssueList(props) {
  const [ChkNum, setChkNum] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [isMounted, setisMounted] = useState(true);

  //Context API를 통해 가져옴
  const { Issues, issueHandler } = useContext(LandingPageContext);

  useEffect(() => {
    setChkNum({
      condition: "chkBox",
      num: 0,
    });
    axios.get("/api/issue").then((response) => {
      if (response.data.success && isMounted) {
        setLoading(false);
        issueHandler(response.data.issues);
      } else {
        alert("Failed to get issues");
      }
    });
    return () => {
      setisMounted(false);
    };
  }, []);

  // issue 로딩시 보여질 로딩 이미지
  const renderLoading = (
    <div className="emptyList" id="loading">
      <img id="loadingImg" src={loadingImg} alt="loading..." />
    </div>
  );

  // issue 결과 값이 없을때 보여질 화면
  const renderNoResult = (
    <div className="emptyList" id="noResult">
      <div id="noResultIcon">❕</div>
      <div id="noResultmsg">No results matched your search.</div>
    </div>
  );

  // issue cards에게 넘겨줄 checkBox handler
  const cardsCheckHandler = (id, bool) => {
    if (bool && ChkNum.num + 1 === Issues.length - 1) {
      setChkNum({
        condition: "chkBox checkedAll",
        num: ChkNum.num + 1,
      });
    } else if (!bool && ChkNum.num - 1 === 0) {
      setChkNum({
        condition: "chkBox",
        num: ChkNum.num - 1,
      });
    } else if (bool) {
      setChkNum({
        condition: "chkBox checked",
        num: ChkNum.num + 1,
      });
    } else if (!bool) {
      setChkNum({
        condition: "chkBox checked",
        num: ChkNum.num - 1,
      });
    }
  };

  const cardItemList = (id, handler) => {
    items.set(id, handler);
  };

  function useStateHandler(state) {
    if (state) {
      for (let [key, value] of items) {
        value({
          condition: "chkBox checked",
        });
      }
    } else {
      for (let [key, value] of items) {
        value({
          condition: "chkBox",
        });
      }
    }
  }

  //issue card 렌더링 부분
  const renderIssueCards = Issues.map((issue, index) => {
    //임시로 4개 카드만 렌더링 되도록 설정
    if (index > 10) {
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
        comments={issue.comments}
        assignee={issue.users}
        labels={issue.labels}
        checkHandler={cardsCheckHandler}
        checkedAll={cardItemList}
      />
    );
  });

  //issue list에서 사용할 checkBox handler
  function chkBox() {
    if (ChkNum.condition !== "chkBox") {
      setChkNum({
        condition: "chkBox",
        num: 0,
      });
      useStateHandler(false);
    } else {
      setChkNum({
        condition: "chkBox checkedAll",
        num: Issues.length - 1,
      });
      useStateHandler(true);
    }
  }

  const markAsOpt = (
    <div id="rightMenu">
      <div className="optBtn" id="markAs">
        Mark as ▾
      </div>
    </div>
  );

  const filterOpt = (
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
  );

  return (
    <div id="issueListArea">
      <MenuStyle id="filterArea">
        <div id="leftMenu">
          <div
            id="issueAllChkBox"
            onClick={chkBox}
            className={ChkNum.condition}
          />
          {ChkNum.num !== 0 && <div>{ChkNum.num} selected</div>}
        </div>
        {ChkNum.num === 0 ? filterOpt : markAsOpt}
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
