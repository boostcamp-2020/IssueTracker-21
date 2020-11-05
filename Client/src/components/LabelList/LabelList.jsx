import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./LabelList.scss";
import LabelCard from "../LabelCard";

let items = new Map();

function LabelList() {
  const [Labels, setLabels] = useState([]);
  const [LabelsCount, setLabelsCount] = useState([]);

  /* get issue data */
  useEffect(() => {
    axios.get("/api/label").then((response) => {
      if (response.data.success) {
        setLabels(response.data.labels.rows);
        setLabelsCount(response.data.labels.count);
      } else {
        alert("Failed to get labels");
      }
    });
  }, []);

  /* no result */
  const renderNoResult = (
    <div className="emptyList" id="noResult">
      <div id="noResultIcon">❕</div>
      <div id="noResultmsg">No results matched your search.</div>
    </div>
  );

  /* rendering */
  const renderLabelCards = Labels.map((label, index) => {
    return (
      <LabelCard
        id={label.id}
        name={label.name}
        description={label.description}
        color={label.color}
      />
    );
  });

  return (
    <div id="labelListArea">
      <div id="labelCardCountArea">{LabelsCount} labels</div>
      <div id="labelCardArea">
        {Labels.length === 0 ? renderNoResult : renderLabelCards}
      </div>
    </div>
  );
}

export default LabelList;
