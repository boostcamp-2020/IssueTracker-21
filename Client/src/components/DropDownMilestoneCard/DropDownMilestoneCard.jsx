import React, { useEffect, useState, useContext } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import "./DropDownMilestoneCard.scss";
import { DropDownContext } from "../DropDown";

function DropDownMilestoneCard(props) {
  const { id, title } = props;
  const { onCardClicked } = useContext(DropDownContext);

  return (
    <div
      className="dropDownMilestoneCard"
      data-milestoneid={id}
      onClick={()=>onCardClicked({ id, title })}
    >
      <div className="dropDownMilestoneName">{title}</div>
    </div>
  );
}

export default DropDownMilestoneCard;
