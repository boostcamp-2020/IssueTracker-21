import React, { useEffect, useState, useRef } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import "./DropDown.scss";
import DropDownLabelList from "../DropDownLabelList";
import DropDownAssigneeList from "../DropDownAssigneeList";
import DropDownAuthorList from "../DropDownAuthorList";
import DropDownMilestoneList from "../DropDownMilestoneList";

export const DropDownContext = React.createContext();

function DropDown(props) {
  const dropDownRef = useRef();
  const { onCardClicked, status, handler, filter } = props;
  const [Items, setItems] = useState([]);

  const handleClickOutside = ({ target }) => {
    if (status && !dropDownRef.current.contains(target)) handler(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getProperList = (filter) => {
    switch (filter) {
      case "assignee":
        return <DropDownAssigneeList></DropDownAssigneeList>;
      case "author":
        return <DropDownAuthorList></DropDownAuthorList>;
      case "label":
        return <DropDownLabelList></DropDownLabelList>;
      case "milestone":
        return <DropDownMilestoneList></DropDownMilestoneList>;
    }
  };

  return (
    <DropDownContext.Provider value={{ onCardClicked }}>
      {status && (
        <div className="dropDownContainter" ref={dropDownRef}>
          <div className="dropDownBarContainter">Filter by {filter}</div>
          <div className="dropDownListContainter">{getProperList(filter)}</div>
        </div>
      )}
    </DropDownContext.Provider>
  );
}

export default DropDown;
