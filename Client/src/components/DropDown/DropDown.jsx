import React, { useEffect, useState, useRef, useContext } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import DropDownLabelList from "../DropDownLabelList";
import DropDownAssigneeList from "../DropDownAssigneeList";
import DropDownAuthorList from "../DropDownAuthorList";
import DropDownMilestoneList from "../DropDownMilestoneList";
import styled from "styled-components";
import { SidebarContext } from "../Sidebar";

export const DropDownContext = React.createContext();

function DropDown(props) {
  const dropDownRef = useRef();
  const { onCardClicked, status, handler, filter } = props;
  const {
      curAssigneeListHandler,
      curlabelListHandler,
      curMilestoneListHandler,
      labelList,
      milestone,
      assigneeList,
    } = useContext(SidebarContext);
  

  const [Items, setItems] = useState([]);

  const handleClickOutside = ({ target }) => {
    if (status && !dropDownRef.current.contains(target)) {
      switch (filter) {
        case "assignee":
          curAssigneeListHandler(assigneeList);
          break;
        case "label":
          curlabelListHandler(labelList);
          break;
        case "milestone":
          curMilestoneListHandler(milestone);
      }
      handler(false);
    }
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
        <DropDownContainter ref={dropDownRef}>
          <DropDownBarContainter>Filter by {filter}</DropDownBarContainter>
          <DropDownListContainter>
            {getProperList(filter)}
          </DropDownListContainter>
        </DropDownContainter>
      )}
    </DropDownContext.Provider>
  );
}

const DropDownContainter = styled.div`
  position: absolute;
  background-color:#ffffff;
  width: 200px;
  border-radius: 6px;
  border: 1px solid rgb(225, 228, 232);
  font-size: 13px;
  display: flex;
  flex-flow: column;
  box-shadow: 0px 0px 5px rgb(225, 228, 232);
  z-index: 3;
`;

const DropDownBarContainter = styled.div`
  border-radius: 6px 6px 0 0;
  background-color: #fafbfc;
  padding: 7px;
  font-weight: 700;
`;

const DropDownListContainter = styled.div`
  cursor: pointer;
  border-radius: 0 0 6px 6px;
  max-height: 200px;
  overflow: scroll;
`;

export default DropDown;
