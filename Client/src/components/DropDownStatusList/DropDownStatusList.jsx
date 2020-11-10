import React, { useEffect, useState, useContext } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DropDownContext } from "../DropDown";

function DropDownStatusList() {
  const [Items, setItems] = useState([]);
  const [SelectedItems, setSelectedItems] = useState([]);

  return (
  <div className="dropDownList">
    <div className="dropDownCardContainter">
    <DropDownStatusCard
      data-isOpened={1}
    >
      <div className="dropDownMilestoneName">Open</div>
    </DropDownStatusCard>
    <DropDownStatusCard
      data-isOpened={0}
    >
      <div className="dropDownMilestoneName">Closed</div>
    </DropDownStatusCard>
    </div>
  </div>
  );
}

const DropDownStatusCard = styled.div`
border-top: 1px solid rgb(225, 228, 232);
padding: 7px;
display: flex;
align-items: center;
justify-content: center;
:hover {
    background-color: #f6f8fa;
  }
`

export default DropDownStatusList;
