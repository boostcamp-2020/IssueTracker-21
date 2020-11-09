import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./LabelList.scss";
import LabelCard from "../LabelCard";
import LabelEditArea from "../LabelEditArea";

function LabelList() {
  const [Labels, setLabels] = useState([]);
  const [LabelsCount, setLabelsCount] = useState([]);

  /* get label data */
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


  const deleteLabelHandler = (id) => {
    const body = {
      labelId: id
  }
    

    axios.delete("/api/label", {data:body})
    .then(response => {
        if(response.data.success){
            alert("성공적으로 라벨을 delete했습니다.");
            refreshLabelCards();
        } else {
            alert("라벨 delete에 실패했습니다.");
        }  
  }
  )
}

  /* rendering */
  const renderLabelCards = Labels.map((label, index) => {
    return (
      <LabelCard
        key={index}
        id={label.id}
        name={label.name}
        description={label.description}
        color={label.color}
        deleteFunction={deleteLabelHandler}
      />
    );
  });

  const refreshLabelCards = () => {
    axios.get("/api/label").then((response) => {
      if (response.data.success) {
        setLabels(response.data.labels.rows);
        setLabelsCount(response.data.labels.count);
      } else {
        alert("Failed to get labels");
      }
    });
  }

  return (
    <div id="labelListArea">
      <LabelEditArea refreshFunction={refreshLabelCards} labelName="" labelDescription="" labelColor="#FFFFFF" />
      <div id="labelCardCountArea">{LabelsCount} labels</div>
      <div id="labelCardArea">
        {Labels.length === 0 ? renderNoResult : renderLabelCards}
      </div>
    </div>
  );
}

export default LabelList;
