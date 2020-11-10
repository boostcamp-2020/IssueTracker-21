import React from "react";
import styled from "styled-components";

const MilestoneTitle = styled.h1`
  font-size: 32px;
  color: #777777;
`;
const MilestoneInfo = styled.div`
  display: flex;
  font-size: 12px;
  color: #777777;
  font-weight: bold;
`;

const MilestoneLink = styled.p`
  margin-left: 1%;
  color: blue;
`;

function NewMilestoneHeader() {
  return (
    <div>
      <MilestoneTitle>New milestone</MilestoneTitle>
      <MilestoneInfo>
        Create a new milestone to help organize your issues and pull requests.
        Lean more about <MilestoneLink>milestones and issues.</MilestoneLink>
      </MilestoneInfo>
    </div>
  );
}

export default NewMilestoneHeader;
