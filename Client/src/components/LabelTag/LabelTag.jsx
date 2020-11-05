import React from "react";
import styled from "styled-components";

const LabelStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  color: ${(props) => getFontColor(props.color)};
  border-radius: 4px;
  padding: 0 5px;
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  margin-right: 5px;
`;

function getFontColor(color) {
  const R = parseInt(color.slice(1, 3), 16) <= 128 ? true : false;
  const G = parseInt(color.slice(3, 5), 16) <= 128 ? true : false;
  const B = parseInt(color.slice(5), 16) <= 128 ? true : false;
  return R || G || B ? "#FFFFFF" : "#000000";
}

function LabelTag(props) {
  const { labelName, color } = props;

  return <LabelStyle color={color}>{labelName}</LabelStyle>;
}

export default LabelTag;
