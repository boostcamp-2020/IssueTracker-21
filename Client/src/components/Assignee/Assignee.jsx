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

  const [Move, setMove] = useState(false);

  function MouseEnterHandler() {
    setMove(true);
  }

  function MouseLeaveHandler() {
    setMove(false);
  }

  const assigneeCard = assignee.map((user, idx) => {
    return (
      <AssigneeCard
        key={idx}
        userInfo={user}
        idx={idx}
        marginVal={idx !== 0 ? Move : false}
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
