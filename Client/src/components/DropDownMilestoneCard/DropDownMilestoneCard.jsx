import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import "./DropDownMilestoneCard.scss";

function DropDownMilestoneCard(props) {
  const {id, title} = props;

  return (
    <div className="dropDownMilestoneCard"  data-milestoneid={id}>
      <div className="dropDownMilestoneName">{title}</div>
    </div>
  );
}

export default DropDownMilestoneCard;
