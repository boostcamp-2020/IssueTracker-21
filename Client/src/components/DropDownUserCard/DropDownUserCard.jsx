import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import "./DropDownUserCard.scss";

function DropDownUserCard(props) {
  const {id, profile} = props;

  return (
  <div className="dropDownUserCardContainer"  data-userid={id}>
    <div className="dropDownprofilePictureContainer">
      <img src={profile}></img>
    </div>
    <div className="dropDownUserIdContainer">
      <div className="dropDownUserId">{id}</div>
    </div>
  </div>
  );
}

export default DropDownUserCard;
