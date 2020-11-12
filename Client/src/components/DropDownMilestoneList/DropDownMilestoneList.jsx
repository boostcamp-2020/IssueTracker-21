import React, { useEffect, useState, useContext } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import DropDownMilestoneCard from "../DropDownMilestoneCard";
import styled from "styled-components";
import { DropDownContext } from "../DropDown";

function DropDownMilestoneList() {
  const [Items, setItems] = useState([]);
  const [SelectedItems, setSelectedItems] = useState([]);
  const { milestoneNothingHandler, handler } = useContext(DropDownContext);
  /* get data */
  useEffect(() => {
    axios.get("/api/milestone").then((response) => {
      if (response.data.success) {
        const milestones = response.data.milestones;
        const result = milestones.reduce((acc, cur) => {
          cur.closeCount = 0;
          cur.openCount = 0;

          if (acc.length == 0) {
            if (cur.issueIsOpened == 0) {
              cur.closeCount = cur.count;
            } else {
              cur.openCount = cur.count;
            }
            return [cur];
          }

          if (acc[acc.length - 1] && acc[acc.length - 1].id === cur.id) {
            if (cur.issueIsOpened == 0) {
              acc[acc.length - 1].closeCount = cur.count;
            } else {
              acc[acc.length - 1].openCount = cur.count;
            }
            return acc;
          } else {
            if (cur.issueIsOpened == 0) {
              cur.closeCount = cur.count;
            } else {
              cur.openCount = cur.count;
            }

            return acc.concat([cur]);
          }
        }, []);
        setItems(result);
      } else {
        alert("Failed to get milestones");
      }
    });
  }, []);

  /* rendering */
  const renderCards = Items.map((item, index) => {
    return (
      <DropDownMilestoneCard key={index} id={item.id} title={item.title} />
    );
  });

  return (
    <div className="dropDownList">
      <div className="dropDownCardContainter">
        <NotSelect
          onClick={(e) => {
            milestoneNothingHandler();
            handler(false);
          }}
        >
          Issues with no milestones
        </NotSelect>
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
`;
export default DropDownMilestoneList;
