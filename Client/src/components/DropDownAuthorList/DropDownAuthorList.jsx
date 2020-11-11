import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import DropDownUserCard from "../DropDownUserCard";
import styled from "styled-components";

function DropDownAuthorList(props) {
  const [Items, setItems] = useState([]);
  const [SelectedItems, setSelectedItems] = useState([]);

    /* get data */
    useEffect(() => {
      axios.get("/api/user/users").then((response) => {
        if (response.data.success) {
          setItems(response.data.users.rows);
        } else {
          alert("Failed to get authors");
        }
      });
    }, []);

  /* rendering */
  const renderCards = Items.map((item, index) => {
    return (
          <DropDownUserCard
            key={index}
            id={item.id}
            profile={item.profile}
          />
        );
    })

  return (
  <div className="dropDownList">
    <div className="dropDownCardContainter">
      {renderCards}
    </div>
  </div>
  );
}

export default DropDownAuthorList;
