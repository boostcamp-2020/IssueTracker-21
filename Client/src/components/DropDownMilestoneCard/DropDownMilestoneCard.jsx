import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import "./DropDownMilestoneCard.scss";

function DropDownMilestoneCard(props) {
  const {id, name} = props;

  return (
    <div className="dropDownMilestoneCard"  data-milestoneid={id}>
      <div className="dropDownMilestoneName">{name}</div>
    </div>
  );
}

export default DropDownMilestoneCard;
