import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import "./DropDown.scss";
import DropDownLabelCard from "../DropDownLabelCard";
import DropDownUserCard from "../DropDownUserCard";
import DropDownMilestoneCard from "../DropDownMilestoneCard";

function DropDown(props) {
  const filter = props;

  const [Items, setItems] = useState([]);
  const [SelectedItems, setSelectedItems] = useState([]);

    /* get data */
    useEffect(() => {
      axios.get(`/api/${filter}`).then((response) => {
        if (response.data.success) {
          if (filter === "author" || "assignee"){
            setItems(response.data.users.rows);
          } else if (filter === "label") {
            setItems(response.data.labels.rows);
          } else {
            setItems(response.data.milestones);
          }
        } else {
          alert("Failed to get items");
        }
      });
    }, []);

      /* rendering */
  const renderCards = Items.map((item, index) => {
    switch (filter) {
      case "author":
        return (
          <DropDownUserCard
            id={item.id}
            profile={item.profile}
          />
        );
        break;
      case "label":
        return (
          <DropDownLabelCard
            id={item.id}
            name={item.name} 
            description={item.description} 
            color={item.color}
          />
        );
        break;
      case "milestones":
        return (
          <DropDownMilestoneCard
            id={item.id}
            name={item.name} 
          />
        );
        break;
      case "assignee":
        return (
          <DropDownUserCard
            id={item.id}
            profile={item.profile}
          />
        );
        break;
    }

  });

  return (
  <div className="dropDownContainter">
    <div className="dropDownBarContainter"></div>
    <div className="dropDownCardContainter">
      <div className></div>
      {renderCards}
    </div>
  </div>
  );
}

export default DropDown;
