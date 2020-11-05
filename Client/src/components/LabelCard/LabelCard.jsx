import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import LabelTag from "../LabelTag";
import "./LabelCard.scss";

function LabelCard(props) {
  const { id, name, description, color } = props;

  return (
    <div className="labelCard" data-labelid={id}>
      <div className="labelTagDisplay">
        {<LabelTag key={id} labelName={name} color={color} />}
      </div>
      <div className="labelDescription">{description}</div>
      <div className="labelButtonContainer">
        <div className="labelEditButton">Edit</div>
        <div className="labelDeleteButton">Delete</div>
      </div>
    </div>
  );
}

export default LabelCard;
