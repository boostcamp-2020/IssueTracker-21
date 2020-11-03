import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./IssueList.scss";
import IssueCard from "../IssueCard";

const MenuStyle = styled.div`
  color: black;
`;

function IssueList() {
  const [ChkBox, setChkBox] = useState(0);
  const [Issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("/api/issue").then((response) => {
      if (response.data.success) {
        setIssues(response.data.issues.rows);
      } else {
        alert("Failed to get issues");
      }
    });
  }, []);

  function chkBox(box) {
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
      <Link to="/login">sss</Link>
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
        <IssueCard
          title="hello world"
          isOpen="true"
          id="8"
          time="2020-11-01"
          authorId="tester1"
          milestoneTitle="milestone Back-end"
        />
      </div>
    </div>
  );
}

export default IssueList;
