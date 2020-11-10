import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import DropDownMilestoneCard from "../DropDownMilestoneCard";
import styled from "styled-components";

function DropDownMilestoneList() {
  const [Items, setItems] = useState([]);
  const [SelectedItems, setSelectedItems] = useState([]);

    /* get data */
    useEffect(() => {
      axios.get("/api/milestone").then((response) => {
        if (response.data.success) {
          setItems(response.data.milestones);
        } else {
          alert("Failed to get milestones");
        }
      });
    }, []);

  /* rendering */
  const renderCards = Items.map((item, index) => {
    return (
      <DropDownMilestoneCard
      key={index}
        id={item.id}
        title={item.title} 
    />
        );
    })

  return (
  <div className="dropDownList">
    <div className="dropDownCardContainter">
      <NotSelect>Issues with no milestones</NotSelect>
      {renderCards}
    </div>
  </div>
  );
}

const NotSelect = styled.div`
border-top: 1px solid rgb(225, 228, 232);
padding: 7px;
display: flex;
align-items: center;
justify-content: center;
:hover {
    background-color: #f6f8fa;
  }
`

export default DropDownMilestoneList;
