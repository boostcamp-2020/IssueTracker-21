import React, { useEffect, useState, useContext } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./DropDownUserCard.scss";

import { DropDownContext } from "../DropDown";

const DropDownprofilePicture = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 4px;
`;

function DropDownUserCard(props) {
  const { id, profile } = props;
  const { onCardClicked } = useContext(DropDownContext);

  return (
    <div
      className="dropDownUserCard"
      data-userid={id}
      onClick={() => onCardClicked({ id, profile })}
    >
      <div className="dropDownprofilePictureContainer">
        <DropDownprofilePicture src={profile} />
      </div>
      <div className="dropDownUserIdContainer">{id}</div>
    </div>
  );
}

export default DropDownUserCard;
