import React, { useState } from "react";
import LabelTag from "../LabelTag";
import "./LabelCardContent.scss";

function LabelCardContent(props) {
  const { id, name, description, color, deleteFunction, setEditing } = props;

  return (
    <div className="labelCardContent" data-labelid={id}>
      <div className="labelTagDisplay">
        <LabelTag key={id} labelName={name} color={color} />
      </div>
      <div className="labelDescription">{description}</div>
      <div className="labelButtonContainer">
        <div className="labelEditButton" onClick={setEditing}>Edit</div>
        <div className="labelDeleteButton" onClick={() => deleteFunction(id)}>Delete</div>
      </div>
    </div>
  );
}

export default LabelCardContent;
