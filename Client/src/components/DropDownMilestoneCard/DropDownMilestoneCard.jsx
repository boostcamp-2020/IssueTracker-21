import React, { useEffect, useState, useContext } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DropDownContext } from "../DropDown";
import { DropDownFilterContext } from "../DropDownFilter";

function DropDownMilestoneCard(props) {
  const { id, title } = props;
  const {isFilter} = useContext(DropDownFilterContext);
  if(isFilter) {
    const { onCardClicked } = useContext(DropDownFilterContext);
  }else {
    const { onCardClicked } = useContext(DropDownContext);
  } 

  return (
    <DropDownMilestoneName
      data-milestoneid={id}
      onClick={()=>onCardClicked({ id, title })}
    >
      <div className="dropDownMilestoneName">{title}</div>
    </DropDownMilestoneName>
  );
}

const DropDownMilestoneName=styled.div`
border-top: 1px solid rgb(225, 228, 232);
padding: 7px;
display: flex;
align-items: center;
justify-content: center;
:hover {
    background-color: #f6f8fa;
  }
`



export default DropDownMilestoneCard;
