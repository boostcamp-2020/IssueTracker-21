import React, { useEffect, useState, useContext } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import DropDownUserCard from "../DropDownUserCard";
import styled from "styled-components";

import { DropDownContext } from "../DropDown";

function DropDownAssigneeList() {
  const [Items, setItems] = useState([]);
  const [SelectedItems, setSelectedItems] = useState([]);
  const { assignNobodyHandler, handler } = useContext(DropDownContext);

  /* get data */
  useEffect(() => {
    axios.get("/api/user/users").then((response) => {
      if (response.data.success) {
        setItems(response.data.users.rows);
      } else {
        alert("Failed to get assignees");
      }
    });
  }, []);

  /* rendering */
  const renderCards = Items.map((item, index) => {
    return <DropDownUserCard key={index} id={item.id} profile={item.profile} />;
  });

  return (
    <div className="dropDownList">
      <div className="dropDownCardContainter">
        <NotSelect
          onClick={(e) => {
            assignNobodyHandler();
            handler(false);
          }}
        >
          Assigned to Nobody
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

export default DropDownAssigneeList;
