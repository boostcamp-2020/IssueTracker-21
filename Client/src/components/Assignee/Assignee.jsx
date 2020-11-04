import React, { useState } from "react";
import AssigneeCard from "./AssigneeCard";

import styled from "styled-components";

const AssigneeStyle = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
`;

function Assignee(props) {
  const { assignee } = props;

  const [Move, setMove] = useState("-15px");

  function MouseEnterHandler() {
    setMove("2px");
  }

  function MouseLeaveHandler() {
    setMove("-15px");
  }

  const assigneeCard = assignee.map((user, idx) => {
    return (
      <AssigneeCard
        key={idx}
        userInfo={user}
        idx={idx}
        marginVal={idx !== 0 ? Move : "-15px"}
      ></AssigneeCard>
    );
  });
  return (
    <AssigneeStyle
      onMouseEnter={MouseEnterHandler}
      onMouseLeave={MouseLeaveHandler}
    >
      {assigneeCard}
    </AssigneeStyle>
  );
}

export default Assignee;
