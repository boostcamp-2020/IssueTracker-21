import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import "./DropDownLabelCard.scss";

function DropDownLabelCard(props) {
  const {id, name, description, color} = props;

  return (
    <div className="dropDownLabelCard"  data-labelid={id}>
      <div className="dropDownLabelColorNameContainer">
        <div className="dropDownLabelColorContainer">
          <div className="dropDownLabelColor"></div>
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
