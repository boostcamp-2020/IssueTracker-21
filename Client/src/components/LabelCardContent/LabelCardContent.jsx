import React, { useState } from "react";
import LabelTag from "../LabelTag";
import styled from "styled-components";

function LabelCardContent(props) {
  const { id, name, description, color, deleteFunction, setEditing } = props;

  return (
    <LabelCardContentContainer data-labelid={id}>
      <LabelTagDisplay>
        <LabelTag key={id} labelName={name} color={color} />
      </LabelTagDisplay>
      <LabelDescription>{description}</LabelDescription>
      <LabelButtonContainer>
        <LabelEditButton onClick={setEditing}>Edit</LabelEditButton>
        <LabelDeleteButton onClick={() => deleteFunction(id)}>Delete</LabelDeleteButton>
      </LabelButtonContainer>
    </LabelCardContentContainer>
  );
}

const LabelCardContentContainer= styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
justify-items: center;
`

const LabelTagDisplay = styled.div`
display: flex;
width: 20%;
`
const LabelDescription = styled.div`
display: flex;
width: 70%;
font-size: 13px;
color: rgb(99, 99, 99);
`
const LabelButtonContainer = styled.div`
display: flex;
width: 10%;
font-size: 13px;
color: rgb(99, 99, 99);
cursor: pointer;
`
const LabelEditButton = styled.div`
display: flex;
width: 50%;
`
const LabelDeleteButton = styled.div`
display: flex;
width: 50%;
`
export default LabelCardContent;
