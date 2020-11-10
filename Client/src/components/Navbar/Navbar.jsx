import React, { useEffect, useState, useMemo } from "react";
import CustomBtn from "../../components/CustomBtn";
import { Icon, InlineIcon } from "@iconify/react";
import tagIcon from "@iconify/icons-octicon/tag";
import milestone24 from "@iconify/icons-octicon/milestone-24";
import CustomDropDown from "../../components/CustomDropDown";
import CustomInput from "../../components/CustomInput";
import styled from "styled-components";

import "./style.css";
function Navbar(props) {
  function moveNewIssue() {
    props.history.push("/new");
  }

  return (
    <div className="customNavbar">
      <div className="filter__section">
        <CustomDropDown />
        <CustomInput />
      </div>
      <div className="button__section">
        <BtnAreaStyle href="/labels" className="navBtn">
          <CustomBtn
            color="black"
            bgColor="white"
            width="100%"
            height="30px"
            border="1px solid #e1e4e8"
            borderRad="6px"
            padding="5px 13px"
          >
            <Icon width="18" height="18" icon={tagIcon} />
            &nbsp;Labels
          </CustomBtn>
        </BtnAreaStyle>
        <BtnAreaStyle href="/milestone" className="navBtn">
          <CustomBtn
            color="black"
            bgColor="white"
            width="100%"
            height="30px"
            border="1px solid #e1e4e8"
            borderRad="6px"
            padding="5px 13px"
          >
            <Icon width="18" height="18" icon={milestone24} />
            &nbsp;Milestones
          </CustomBtn>
        </BtnAreaStyle>
      </div>
      &nbsp;&nbsp;
      <CustomBtn
        color="white"
        bgColor="#2ea44f"
        width="110px"
        borderRad="6px"
        height="30px"
        border="0"
        onClick={moveNewIssue}
      >
        New issue
      </CustomBtn>
    </div>
  );
}

const BtnAreaStyle = styled.a`
  width: 100%;
`;

export default Navbar;
