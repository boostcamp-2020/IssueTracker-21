import React, { useState } from "react";
import styled from "styled-components";

const AssigneeCardStyle = styled.img`
  width: 22px;
  height: 22px;
  margin-right: ${(props) => props.marginVal};
  border-radius: 20px;
  border: 1px solid white;
`;

function AssigneeCard(props) {
  const { userInfo, idx, marginVal } = props;

  return (
    <div className="userPic">
      <AssigneeCardStyle
        src={userInfo.profile}
        idx={idx}
        marginVal={marginVal}
      />
    </div>
  );
}

export default AssigneeCard;
