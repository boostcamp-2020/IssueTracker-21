import React, { useEffect, useState, useMemo, useContext } from "react";
import CustomBtn from "../CustomBtn";
import { Icon, InlineIcon } from "@iconify/react";
import tagIcon from "@iconify/icons-octicon/tag";
import milestone24 from "@iconify/icons-octicon/milestone-24";
import CustomDropDown from "../CustomDropDown";
import CustomInput from "../CustomInput";
import { LabelPageContext } from "../../views/LabelPage/LabelPage";
import styled from "styled-components";

function LabelNavBar(props) {
  const { toggleLabelEditArea } = useContext(LabelPageContext);

  function labelsHandler() {
    props.history.push("/labels");
  }

  function milestonesHandler() {
    props.history.push("/milestone");
  }
  return (
    <LabelNavBarContainer>
      <LinkButtonContainer>
        <ButtonSectionStyle>
          <CustomBtn
            color="white"
            bgColor="#0E66D6"
            width="100%"
            height="30px"
            border="1px solid #e1e4e8"
            borderRad="6px 0 0 6px"
            padding="5px 13px"
            onClick={labelsHandler}
          >
            <Icon width="18" height="18" icon={tagIcon} />
            &nbsp;Labels
          </CustomBtn>

          <CustomBtn
            color="black"
            bgColor="white"
            width="100%"
            height="30px"
            border="1px solid #e1e4e8"
            borderRad="0 6px 6px 0"
            padding="5px 13px"
            onClick={milestonesHandler}
          >
            <Icon width="18" height="18" icon={milestone24} />
            &nbsp;Milestones
          </CustomBtn>
        </ButtonSectionStyle>
      </LinkButtonContainer>

      <NewLabelButtonContainer>
        <NewLabelButton onClick={toggleLabelEditArea}>New label</NewLabelButton>
      </NewLabelButtonContainer>
    </LabelNavBarContainer>
  );
}

const LabelNavBarContainer = styled.div`
  width: 80%;
  display: flex;
  margin-top: 12px;
  align-items: center;
  *:focus {
    outline: none;
  }
`;

const ButtonSectionStyle = styled.div`
display: flex;
width: 60%;
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
`;

const NewLabelButton = styled.button`
  display: flex;
  background-color: #2ea44f;
  border: 0;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  padding: 3px 5px;
  width: 110px;
  height: 30px;
`;

const BtnAtagStyle = styled.a`
  width: 100%;
`;

export default LabelNavBar;
