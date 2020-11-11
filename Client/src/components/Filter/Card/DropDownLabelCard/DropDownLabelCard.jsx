import React, { useEffect, useState, useContext } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {LandingPageContext} from "../../../../views/LandingPage"

function DropDownLabelCard(props) {
  const { id, name, description, color } = props;
  const { inputOnClickFilterHandler } = useContext(LandingPageContext);

  return (
    <DropDownLabelCardContainer
      data-labelid={id}
      onClick={() => inputOnClickFilterHandler(`label:${name}`)}
    >
      <DropDownLabelColorNameContainer>
        <DropDownLabelColorContainer>
          <LabelColorBox color={color}></LabelColorBox>
        </DropDownLabelColorContainer>
        <DropDownLabelNameContainer>
          <div className="dropDownLabelName">{name}</div>
        </DropDownLabelNameContainer>
      </DropDownLabelColorNameContainer>
      <DropDownLabelDescriptionContainer>
        <div className="dropDownLabelDescription">{description}</div>
      </DropDownLabelDescriptionContainer>
    </DropDownLabelCardContainer>
  );
}

const LabelColorBox = styled.div`
  background-color: ${(props) => props.color};
  width: 10px;
  height: 10px;
  border-radius:1px;
`;

const DropDownLabelCardContainer = styled.div`
  border-top: 1px solid rgb(225, 228, 232);
  padding: 7px;
  display: flex;
  flex-flow: column;
  flex: 1;
  :hover {
      background-color: #f6f8fa;
    }
    `

const DropDownLabelColorNameContainer=styled.div`
      display: flex;
  `

const DropDownLabelColorContainer=styled.div`
      display: flex;
      align-items: center;
      flex: 1;
      padding-left: 20px;
      padding-right: 0;
  `

  const DropDownLabelNameContainer=styled.div`
      display: flex;
      align-items: center;
      flex: 8;
      padding-left: 0px;
      font-weight: 600;
  `
  const DropDownLabelDescriptionContainer=styled.div`
      display: flex;
      align-items: center;
      padding-left: 48px;
  `

export default DropDownLabelCard;
