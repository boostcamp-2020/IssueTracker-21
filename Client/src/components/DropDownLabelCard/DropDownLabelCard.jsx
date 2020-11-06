import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./DropDownLabelCard.scss";

const LabelColorBox = styled.div`
  background-color: ${(props) => props.color};
  width: 10px;
  height: 10px;
  border-radius:1px;
`;

function DropDownLabelCard(props) {
  const {id, name, description, color} = props;

  return (
    <div className="dropDownLabelCard"  data-labelid={id}>
      <div className="dropDownLabelColorNameContainer">
        <div className="dropDownLabelColorContainer">
          <LabelColorBox color={color}></LabelColorBox>
        </div>
        <div className="dropDownLabelNameContainer">
          <div className="dropDownLabelName">{name}</div>
        </div>
      </div>
      <div className="dropDownLabelDescriptionContainer">
        <div className="dropDownLabelDescription">{description}</div>
      </div>
    </div>
  );
}

export default DropDownLabelCard;
