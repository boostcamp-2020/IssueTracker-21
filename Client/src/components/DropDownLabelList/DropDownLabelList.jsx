import React, { useEffect, useState, useContext } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import DropDownLabelCard from "../DropDownLabelCard";
import styled from "styled-components";

import { DropDownContext } from "../DropDown";

function DropDownLabelList() {
  const [Items, setItems] = useState([]);
  const [SelectedItems, setSelectedItems] = useState([]);
  const { labelNothingHandler, handler } = useContext(DropDownContext);

  /* get data */
  useEffect(() => {
    axios.get("/api/label").then((response) => {
      if (response.data.success) {
        setItems(response.data.labels.rows);
      } else {
        alert("Failed to get labels");
      }
    });
  }, []);

  /* rendering */
  const renderCards = Items.map((item, index) => {
    return (
      <DropDownLabelCard
        key={index}
        id={item.id}
        name={item.name}
        description={item.description}
        color={item.color}
      />
    );
  });

  return (
    <div className="dropDownList">
      <div className="dropDownCardContainter">
        <NotSelect
          onClick={(e) => {
            labelNothingHandler();
            handler(false);
          }}
        >
          Unlabeled
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

export default DropDownLabelList;
