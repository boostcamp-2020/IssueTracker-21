import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./DropDownAssigneeList.scss";
import DropDownUserCard from "../DropDownUserCard";

function DropDownAssigneeList() {
  const [Items, setItems] = useState([]);
  const [SelectedItems, setSelectedItems] = useState([]);

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
    return (
          <DropDownUserCard
            id={item.id}
            profile={item.profile}
          />
        );
    })

  return (
  <div className="dropDownList">
    <div className="dropDownCardContainter">
      <div className="notSelect">Assigned to Nobody</div>
      {renderCards}
    </div>
  </div>
  );
}

export default DropDownAssigneeList;
