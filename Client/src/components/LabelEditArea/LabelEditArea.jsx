import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./LabelEditArea.scss";
import LabelTag from "../LabelTag";
import getRandomColor from "../../utils/getRandomColor";
import { LabelPageContext } from "../../views/LabelPage/LabelPage";


function LabelEditArea(props) {
    const {toggleLabelEditArea} = useContext(LabelPageContext);

    const [LabelName, setLabelName] = useState(props.labelName);
    const [LabelDescription, setLabelDescription] = useState(props.labelDescription);
    const [LabelColor, setLabelColor] = useState(props.labelColor);
    const [IsEdit, setIsEdit] = useState(props.isEdit);

    const labelNameChangeHandler = (event) => {
        setLabelName(event.currentTarget.value);
    }

    const labelDescriptionChangeHandler = (event) => {
        setLabelDescription(event.currentTarget.value);
    }

    const labelColorChangeHandler = (event) => {
        setLabelColor(event.currentTarget.value);
    }

    const createButtonHandler = () => {
        if(LabelName != '') return false;
        else return 'disabled';
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const body = {
            labelId: props.labelId,
            name: LabelName,
            description: LabelDescription,
            color: LabelColor
        }

        if (IsEdit){
            axios.put("/api/label", body)
            .then(response => {
                if(response.data.success){
                    alert("성공적으로 라벨을 수정했습니다.");
                    props.refreshFunction();
                    props.setEditing();
                } else {
                    alert("라벨 수정에 실패했습니다.");
                }
            }   
            )
        } else {
            axios.post("/api/label", body)
            .then(response => {
                if(response.data.success){
                    alert("성공적으로 라벨을 추가했습니다.");
                    props.refreshFunction();
                    toggleLabelEditArea();
                } else {
                    alert("라벨 추가에 실패했습니다.");
                }
            }   
            )
        }
    }

    const randomColorGetter = () => {
        const randColor = getRandomColor();
        setLabelColor(randColor);
    }

    return (
        <div className={IsEdit? "labelEditInputContainer":"labelAddInputContainer"}>
            <div className="labelPreviewContainer">
                <div className="labelPreview">
                    <LabelTag labelName={LabelName} color={LabelColor} />
                </div>
            </div>
            <div className="labelInfoInputContainer">
                <form onSubmit = {submitHandler}  className="labelInfoInputForm">
                    <div className="labelNameInputContainer">
                        <label>Label name</label>
                        <input onChange={labelNameChangeHandler} value={LabelName} placeholder="Label name"/>
                    </div>
                    <div className="labelDescriptionInputContainer">
                        <label>Description</label>
                        <input onChange={labelDescriptionChangeHandler} value={LabelDescription} placeholder="Description (optional)"/>
                    </div>
                    <div className="labelColorInputContainer">
                        <label>Color</label>
                        <div className="labelColorInput">
                            <div className="randomLabelColorButton" onClick={randomColorGetter}>
                            <img src="https://img.icons8.com/android/13/000000/refresh.png"/>
                            </div>
                            <input onChange={labelColorChangeHandler} value={LabelColor}/>
                        </div>
                    </div>
                    <div className="labelButtonInputContainer">
                        <button onClick={IsEdit? props.setEditing:toggleLabelEditArea} className="labelCancelButton">
                        Cancel
                        </button>
                        <button type = "submit" className="labelCreateButton" disabled={!LabelName}>
                        {IsEdit? 'Save changes':'Create label'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LabelEditArea;
