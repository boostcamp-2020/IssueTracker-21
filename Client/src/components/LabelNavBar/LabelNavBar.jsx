import React, { useEffect, useState, useMemo, useContext } from "react";
import CustomBtn from "../CustomBtn";
import { Icon, InlineIcon } from "@iconify/react";
import tagIcon from "@iconify/icons-octicon/tag";
import milestone24 from "@iconify/icons-octicon/milestone-24";
import CustomDropDown from "../CustomDropDown";
import CustomInput from "../CustomInput";
import { LabelPageContext } from "../../views/LabelPage/LabelPage";
import styled from "styled-components";

function LabelNavBar() {
  const {toggleLabelEditArea} = useContext(LabelPageContext);

  return (
  <LabelNavBarContainer>
    <LinkButtonContainer></LinkButtonContainer>
    <NewLabelButtonContainer>
      <NewLabelButton onClick={toggleLabelEditArea}>New label</NewLabelButton>
    </NewLabelButtonContainer>
  </LabelNavBarContainer>
  );
}

const LabelNavBarContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  *:focus { outline:none; }
`;

const LinkButtonContainer = styled.div`
  display: flex;
  width: 50%;
`;

const NewLabelButtonContainer = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-end;
`

const NewLabelButton = styled.button`
  display: flex;
  background-color:  #2ea44f;
  border: 1px solid #647c6b;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 13px;
  padding: 3px 5px;
`

export default LabelNavBar;

