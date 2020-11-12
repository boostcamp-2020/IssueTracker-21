import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import IssueCard from "../IssueCard";
import loadingImg from "../../../public/loading.gif";
import { LandingPageContext } from "../../views/LandingPage";
import DropDownStatus from "../DropDownStatus";
import DropDownFilter from "../Filter/DropDownFilter";

let items = new Map();

function IssueList(props) {
  const [ChkNum, setChkNum] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [isMounted, setisMounted] = useState(true);
  const [ChkIssueId, setChkIssueId] = useState([]);
  const [StatusDropDownVisible, setStatusDropDownVisible] = useState(false);
  const [AssigneeDropDownVisible, setAssigneeDropDownVisible] = useState(false);
  const [AuthorDropDownVisible, setAuthorDropDownVisible] = useState(false);
  const [LabelDropDownVisible, setLabelDropDownVisible] = useState(false);
  const [MilestoneDropDownVisible, setMilestoneDropDownVisible] = useState(
    false
  );

  //Context API를 통해 가져옴
  const { Issues, issueHandler } = useContext(LandingPageContext);

  const issueRef = useRef();

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    setChkNum({
      condition: "chkBox",
      num: 0,
    });
    axios.get("/api/issue").then((response) => {
      if (response.data.success && isMounted) {
        setLoading(false);
        issueHandler(response.data.issues.filter((e) => e.isOpened));
      } else {
        alert("Failed to get issues");
      }
    });
    return () => {
      setisMounted(false);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // issue 로딩시 보여질 로딩 이미지
  const renderLoading = (
    <EmptyListStyle className="emptyList" id="loading">
      <LoadingImgStyle id="loadingImg" src={loadingImg} alt="loading..." />
    </EmptyListStyle>
  );

  // issue 결과 값이 없을때 보여질 화면
  const renderNoResult = (
    <NoResultStyle className="emptyList" id="noResult">
      <NoResultIconStyle id="noResultIcon">❕</NoResultIconStyle>
      <NoResultmsgStyle id="noResultmsg">
        No results matched your search.
      </NoResultmsgStyle>
    </NoResultStyle>
  );

  // issue cards에게 넘겨줄 checkBox handler
  const cardsCheckHandler = (id, bool) => {
    if (bool && ChkNum.num + 1 === Issues.length - 1) {
      const newArr = ChkIssueId.concat(id);
      setChkIssueId(newArr);

      setChkNum({
        condition: "chkBox checkedAll",
        num: ChkNum.num + 1,
      });
    } else if (!bool && ChkNum.num - 1 === 0) {
      let newArr = [...ChkIssueId];
      newArr.splice(newArr.indexOf(id), 1);
      setChkIssueId(newArr);

      setChkNum({
        condition: "chkBox",
        num: ChkNum.num - 1,
      });
    } else if (bool) {
      const newArr = ChkIssueId.concat(id);
      setChkIssueId(newArr);

      setChkNum({
        condition: "chkBox checked",
        num: ChkNum.num + 1,
      });
    } else if (!bool) {
      let newArr = [...ChkIssueId];
      newArr.splice(newArr.indexOf(id), 1);
      setChkIssueId(newArr);

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
    return (
      <IssueCard
        key={issue.id}
        id={issue.id}
        title={issue.title}
        isOpen={issue.isOpened ? "true" : null}
        time={issue.updatedAt}
        authorId={issue.authorId}
        milestoneTitle={issue.milestone ? issue.milestone.title : ""}
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
      setChkIssueId([]);
      setChkNum({
        condition: "chkBox",
        num: 0,
      });
      useStateHandler(false);
    } else {
      setChkIssueId(Issues.map((el) => el.id));
      setChkNum({
        condition: "chkBox checkedAll",
        num: Issues.length - 1,
      });
      useStateHandler(true);
    }
  }

  //드롭다운 visibility 관리
  const openStatusDropDown = () => {
    closeFilterDropDown();
    setStatusDropDownVisible(!StatusDropDownVisible);
  };
  const openAuthorDropDown = () => {
    closeFilterDropDown();
    setAuthorDropDownVisible(!AuthorDropDownVisible);
  };
  const openAssigneeDropDown = () => {
    closeFilterDropDown();
    setAssigneeDropDownVisible(!AssigneeDropDownVisible);
  };
  const openLabelDropDown = () => {
    closeFilterDropDown();
    setLabelDropDownVisible(!LabelDropDownVisible);
  };
  const openMilestoneDropDown = () => {
    closeFilterDropDown();
    setMilestoneDropDownVisible(!MilestoneDropDownVisible);
  };

  const closeStatusDropDown = () => {
    setStatusDropDownVisible(false);
  };
  const closeFilterDropDown = () => {
    setAuthorDropDownVisible(false);
    setLabelDropDownVisible(false);
    setMilestoneDropDownVisible(false);
    setAssigneeDropDownVisible(false);
    setStatusDropDownVisible(false);
  };

  const markAsOpt = (
    <RightMenuStyle id="rightMenu">
      <div ref={issueRef}>
        <OptBtnStyle
          className="optBtn"
          id="markAs"
          onClick={openStatusDropDown}
        >
          Mark as ▾
        </OptBtnStyle>
        {StatusDropDownVisible && (
          <DropDownStatus
            visible={StatusDropDownVisible}
            issueIdArr={ChkIssueId}
            onClose={closeStatusDropDown}
          />
        )}
      </div>
    </RightMenuStyle>
  );

  const filterOpt = (
    <RightMenuStyle id="rightMenu" ref={issueRef}>
      <OptBtnStyle
        className="optBtn"
        id="authorOpt"
        onClick={openAuthorDropDown}
      >
        Author ▾
        {AuthorDropDownVisible && (
          <DropDownFilter
            visible={AuthorDropDownVisible}
            onClose={closeFilterDropDown}
            filter="author"
          />
        )}
      </OptBtnStyle>
      <div className="optBtn" id="labelOpt" onClick={openLabelDropDown}>
        Label ▾
        {LabelDropDownVisible && (
          <DropDownFilter
            visible={LabelDropDownVisible}
            onClose={closeFilterDropDown}
            filter="label"
          />
        )}
      </div>
      <div
        className="optBtn"
        id="milestonesOpt"
        onClick={openMilestoneDropDown}
      >
        Milestones ▾
        {MilestoneDropDownVisible && (
          <DropDownFilter
            visible={MilestoneDropDownVisible}
            onClose={closeFilterDropDown}
            filter="milestone"
          />
        )}
      </div>
      <div className="optBtn" id="assigneeOpt" onClick={openAssigneeDropDown}>
        Assignee ▾
        {AssigneeDropDownVisible && (
          <DropDownFilter
            visible={AssigneeDropDownVisible}
            onClose={closeFilterDropDown}
            filter="assignee"
          />
        )}
      </div>
    </RightMenuStyle>
  );

  const handleClickOutside = ({ target }) => {
    if (!issueRef.current.contains(target)) {
      closeFilterDropDown();
    }
  };

  const CheckBoxStyles =
    ChkNum.condition === "chkBox"
      ? ChkBoxStyle
      : ChkNum.condition === "chkBox checkedAll"
      ? CheckedAllStyle
      : CheckedStyle;

  return (
    <IssueListAreaStyle id="issueListArea">
      <FilterAreaStyle id="filterArea">
        <LeftMenuStyle id="leftMenu">
          <CheckBoxStyles
            id="issueAllChkBox"
            onClick={chkBox}
            className={ChkNum.condition}
          />
          {ChkNum.num !== 0 && <div>{ChkNum.num} selected</div>}
        </LeftMenuStyle>
        {ChkNum.num === 0 ? filterOpt : markAsOpt}
      </FilterAreaStyle>
      <IssueCardAreaStyle id="issueCardArea">
        {Loading
          ? renderLoading
          : Issues.length === 0
          ? renderNoResult
          : renderIssueCards}
      </IssueCardAreaStyle>
    </IssueListAreaStyle>
  );
}

const IssueListAreaStyle = styled.div` width: 80%;
}`;

const FilterAreaStyle = styled.div`
  width: 100%;
  color: #586069;
  padding: 15px 10px;
  background-color: #fafbfc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  border: 1px solid rgb(225, 228, 232);
  border-radius: 6px 6px 0 0;
`;

const LeftMenuStyle = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChkBoxStyle = styled.div`
  width: 12px;
  height: 12px;
  border: 1px solid black;
  border-radius: 3px;
  margin-right: 15px;
  cursor: pointer;
`;

const CheckedStyle = styled(ChkBoxStyle)`
  text-align: center;
  color: white;
  font-size: 5px;
  background-color: #3a79fe;
  &:before {
    position: absolute;
    content: "━";
    margin-left: -5px;
    margin-top: -2px;
  }
`;

const CheckedAllStyle = styled(ChkBoxStyle)`
  text-align: center;
  color: white;
  font-size: 10px;
  background-color: #3a79fe;
  &:before {
    position: absolute;
    content: "✔";
    color: white;
    margin-left: -6px;
    margin-top: -2px;
  }
`;

const RightMenuStyle = styled.div`
  width: 45%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const OptBtnStyle = styled.div`
  cursor: pointer;
  width: auto;
  &:hover {
    color: #24292e;
  }
`;

const IssueCardAreaStyle = styled.div`
  width: 100%;
  min-height: 200px;
`;

const EmptyListStyle = styled.div`
  width: 100%;
  min-height: 200px;
  padding: 7px 10px;
  display: flex;
  justify-content: center;
  justify-items: center;
  border: 1px solid rgb(225, 228, 232);
  border-top: 0;
  align-items: center;
`;

const NoResultStyle = styled(EmptyListStyle)`
  display: flex;
  flex-direction: column;
`;

const NoResultIconStyle = styled.div`
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 48px;
  padding-left: 2px;
  font-size: 40px;
  margin-bottom: 20px;
`;

const NoResultmsgStyle = styled.div`
  font-size: 25px;
  font-weight: 800;
`;

const LoadingImgStyle = styled.img`
  width: 50px;
  height: 50px;
`;

export default IssueList;
