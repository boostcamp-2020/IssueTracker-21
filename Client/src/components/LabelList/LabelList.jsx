import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./LabelList.scss";
import LabelCard from "../LabelCard";
import LabelEditArea from "../LabelEditArea";
import getRandomColor from "../../utils/getRandomColor";

function LabelList(props) {
  const {displayLabelEditArea} = props;
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
    const confirmDelete = confirm("이 라벨을 삭제하시겠습니까?");
    if(confirmDelete){
      const body = {
        labelId: id
    }
  
      axios.delete("/api/label", {data:body})
      .then(response => {
          if(response.data.success){
              alert("성공적으로 라벨을 삭제했습니다.");
              refreshLabelCards();
          } else {
              alert("라벨 삭제에 실패했습니다.");
          }  
        })
    }
}

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
        refreshLabelCards = {refreshLabelCards}
      />
    );
  });



  return (
    <div id="labelListArea">
      {displayLabelEditArea? <LabelEditArea refreshFunction={refreshLabelCards} isEdit={false} labelName="" labelDescription="" labelColor={getRandomColor()} />: ''}
      <div id="labelCardCountArea">{LabelsCount} labelss</div>
      <div id="labelCardArea">
        {Labels.length === 0 ? renderNoResult : renderLabelCards}
      </div>
    </div>
  );
}

export default LabelList;
