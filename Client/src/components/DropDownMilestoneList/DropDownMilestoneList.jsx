import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./DropDownMilestoneList.scss";
import DropDownMilestoneCard from "../DropDownMilestoneCard";

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
        id={item.id}
        title={item.title} 
    />
        );
    })

  return (
  <div className="dropDownList">
    <div className="dropDownCardContainter">
      <div className="notSelect">Issues with no milestones</div>
      {renderCards}
    </div>
  </div>
  );
}

export default DropDownMilestoneList;
