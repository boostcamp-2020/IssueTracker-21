import React from "react";
import styled from "styled-components";
import "./IssueList.scss";

const MenuStyle = styled.div`
  color: black;
`;

function IssueList() {
  return (
    <div>
      <MenuStyle id="filterArea">
        <div id="leftMenu">
          <input type="checkbox" id="issueAllChkBox" />
        </div>

        <div id="rightMenu">
          <div id="authorOpt">Author</div>
          <div id="labelOpt">Label</div>
          <div id="projectsOpt">Projects</div>
          <div id="milestonesOpt">Milestones</div>
          <div id="assigneeOpt">Assignee</div>
          <div id="sortOpt">Sort</div>
        </div>
      </MenuStyle>
      <div id="issueCardArea">ss</div>
    </div>
  );
}

export default IssueList;
