import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const openPic = keyframes`
  0% {
    margin-right: -15px;
  }
  100% {
    margin-right: 2px;
  }`;

const closePic = keyframes`
  0% {
    margin-right: 2px;
  }
  100% {
    margin-right: -15px;
  }`;

const AssigneeCardStyle = styled.img`
  width: 22px;
  height: 22px;
  margin-right: -15px;
  border-radius: 20px;
  border: 1px solid white;
  ${(props) =>
    props.marginVal
      ? css`
          animation: 0.1s linear ${openPic};
          animation-direction: alternate;
          animation-fill-mode: forwards;
        `
      : css`
          animation: 0.1s linear ${closePic};
          animation-direction: alternate;
          animation-fill-mode: forwards;
        `}
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
