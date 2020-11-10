import React, { useEffect, useState } from "react";
import axios from "axios";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import LabelTag from "../LabelTag";
import LabelEditArea from "../LabelEditArea";
import LabelCardContent from "../LabelCardContent"
import "./LabelCard.scss";

function LabelCard(props) {
  const { id, name, description, color, deleteFunction, refreshLabelCards } = props;
  const [IsEditing, setIsEditing] = useState(false);

  const setEditing = () => {
    IsEditing? setIsEditing(false):setIsEditing(true);
  }

  return (
    <div className="labelCard" data-labelid={id}>
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
    </div>
  );
}

export default LabelCard;
