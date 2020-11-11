import React, { useEffect, useState, useRef, useContext } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import DropDownLabelList from "../List/DropDownLabelList";
import DropDownAssigneeList from "../List/DropDownAssigneeList";
import DropDownAuthorList from "../List/DropDownAuthorList";
import DropDownMilestoneList from "../List/DropDownMilestoneList";
import styled from "styled-components";

function DropDownFilter(props) {
  const { filter } = props;

  const [Items, setItems] = useState([]);

  const getProperList = (filter) => {
    switch (filter) {
      case "assignee":
        return <DropDownAssigneeList onClose={props.onClose}></DropDownAssigneeList>;
      case "author":
        return <DropDownAuthorList onClose={props.onClose}></DropDownAuthorList>;
      case "label":
        return <DropDownLabelList onClose={props.onClose}></DropDownLabelList>;
      case "milestone":
        return <DropDownMilestoneList onClose={props.onClose}></DropDownMilestoneList>;
    }
  };

  return (
        <DropDownContainter visible={props.visible}>
          <DropDownBarContainter>Filter by {filter}</DropDownBarContainter>
          <DropDownListContainter>
            {getProperList(filter)}
          </DropDownListContainter>
        </DropDownContainter>
  );
}

const DropDownContainter = styled.div`
display: ${(props) => (props.visible ? 'block' : 'none')};
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

export default DropDownFilter;
