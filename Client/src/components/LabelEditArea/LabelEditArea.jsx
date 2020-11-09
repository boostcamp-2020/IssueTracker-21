import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./LabelEditArea.scss";
import LabelTag from "../LabelTag";

function LabelEditArea(props) {
    console.log(1111);
    console.log(props);
    console.log(1111);

    const [LabelName, setLabelName] = useState(props.labelName);
    const [LabelDescription, setLabelDescription] = useState(props.labelDescription);
    const [LabelColor, setLabelColor] = useState(props.labelColor);

    const labelNameChangeHandler = (event) => {
        setLabelName(event.currentTarget.value);
    }

    const labelDescriptionChangeHandler = (event) => {
        setLabelDescription(event.currentTarget.value);
    }

    const labelColorChangeHandler = (event) => {
        setLabelColor(event.currentTarget.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const body = {
            name: LabelName,
            description: LabelDescription,
            color: LabelColor
        }

        axios.post("/api/label", body)
        .then(response => {
            if(response.data.success){
                alert("성공적으로 라벨을 추가했습니다.");
                props.refreshFunction();
            } else {
                alert("라벨 추가에 실패했습니다.");
            }
        }   
        )
    }

    return (
        <div className="labelEditContainer">
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
                            <div className="randomLabelColorButton">@</div>
                            <input onChange={labelColorChangeHandler} value={LabelColor}/>
                        </div>
                    </div>
                    <div className="labelButtonInputContainer">
                        <button type = "" className="labelCancelButton">
                        Cancel
                        </button>
                        <button type = "submit" className="labelCreateButton">
                        Create label
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LabelEditArea;
