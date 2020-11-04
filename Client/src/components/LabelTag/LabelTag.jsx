import React from "react";
import styled from "styled-components";

const LabelStyle = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 20px;
  padding: 0 15px;
  padding-top: 4px;
  line-height: 20px;
  font-size: 16px;
  font-weight: 500;
  margin-right: 5px;
`;

function LabelTag(props) {
  const { labelName, color } = props;

  return <LabelStyle color={color}>{labelName}</LabelStyle>;
}

export default LabelTag;
