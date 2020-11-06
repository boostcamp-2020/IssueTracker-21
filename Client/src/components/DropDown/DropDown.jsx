import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import "./DropDown.scss";
import DropDownLabelList from "../DropDownLabelList";
import DropDownAssigneeList from "../DropDownAssigneeList";
import DropDownAuthorList from "../DropDownAuthorList";
import DropDownMilestoneList from "../DropDownMilestoneList";

function DropDown(props) {
  const filter = props.filter;

  const [Items, setItems] = useState([]);
  const [SelectedItems, setSelectedItems] = useState([]);

  const getProperList = (filter) => {
    switch (filter){
      case "assignee":
        return <DropDownAssigneeList></DropDownAssigneeList>;
      case "author":
        return <DropDownAuthorList></DropDownAuthorList>;
      case "label":
        return <DropDownLabelList></DropDownLabelList>;       
      case "milestone":
        return <DropDownMilestoneList></DropDownMilestoneList>;
    }
  }

  return (
  <div className="dropDownContainter">
    <div className="dropDownBarContainter">Filter by {filter}</div>
    <div className="dropDownListContainter">
      {getProperList(filter)}
    </div>
  </div>
  );
}

export default DropDown;
