import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./DropDownLabelList.scss";
import DropDownLabelCard from "../DropDownLabelCard";

function DropDownLabelList() {
  const [Items, setItems] = useState([]);
  const [SelectedItems, setSelectedItems] = useState([]);

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
            id={item.id}
            name={item.name}
            description={item.description}
            color={item.color}
          />
        );
    })

  return (
  <div className="dropDownList">
    <div className="dropDownCardContainter">
      <div className="notSelect">Unlabeled</div>
      {renderCards}
    </div>
  </div>
  );
}

export default DropDownLabelList;
