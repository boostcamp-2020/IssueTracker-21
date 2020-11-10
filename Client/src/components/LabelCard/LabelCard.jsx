import React, { useEffect, useState } from "react";
import axios from "axios";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import LabelTag from "../LabelTag";
import LabelEditArea from "../LabelEditArea";
import LabelCardContent from "../LabelCardContent"
import styled from "styled-components";

function LabelCard(props) {
  const { id, name, description, color, deleteFunction, refreshLabelCards } = props;
  const [IsEditing, setIsEditing] = useState(false);

  const setEditing = () => {
    IsEditing? setIsEditing(false):setIsEditing(true);
  }

  return (
    <LabelCardContainer data-labelid={id}>
      {IsEditing? 
      <LabelEditArea 
      refreshFunction={refreshLabelCards} 
      setEditing={setEditing}
      labelId={id} 
      isEdit={true} 
      labelName={name} 
      labelDescription={description} 
      labelColor={color} />
      :
      <LabelCardContent 
      id={id}
      name={name}
      description={description}
      color={color}
      deleteFunction={deleteFunction}
      setEditing={setEditing}
      />}
    </LabelCardContainer>
  );
}

const LabelCardContainer=styled.div`
width: 100%;
padding: 7px 10px;
display: flex;
flex-direction: row;
justify-content: space-between;
justify-items: center;
border: 1px solid rgb(225, 228, 232);
border-top: 0;
padding: 20px;

:hover {
  background-color: #f6f8fa;
}`
export default LabelCard;
