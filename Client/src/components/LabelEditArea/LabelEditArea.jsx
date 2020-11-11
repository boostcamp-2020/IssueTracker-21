import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import LabelTag from "../LabelTag";
import getRandomColor from "../../utils/getRandomColor";
import { LabelPageContext } from "../../views/LabelPage/LabelPage";
import EditStyle from "./EditInputStyle";
import AddStyle from "./AddInputStyle";

function LabelEditArea(props) {
  const { toggleLabelEditArea } = useContext(LabelPageContext);

  const [LabelName, setLabelName] = useState(props.labelName);
  const [LabelDescription, setLabelDescription] = useState(
    props.labelDescription
  );
  const [LabelColor, setLabelColor] = useState(props.labelColor);
  const [IsEdit, setIsEdit] = useState(props.isEdit);

  const labelNameChangeHandler = (event) => {
    setLabelName(event.currentTarget.value);
  };

  const labelDescriptionChangeHandler = (event) => {
    setLabelDescription(event.currentTarget.value);
  };

  const labelColorChangeHandler = (event) => {
    setLabelColor(event.currentTarget.value);
  };

  const createButtonHandler = () => {
    if (LabelName != "") return false;
    else return "disabled";
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const body = {
      labelId: props.labelId,
      name: LabelName,
      description: LabelDescription,
      color: LabelColor,
    };

    if (IsEdit) {
      axios.put("/api/label", body).then((response) => {
        if (response.data.success) {
          alert("성공적으로 라벨을 수정했습니다.");
          props.refreshFunction();
          props.setEditing();
        } else {
          alert("라벨 수정에 실패했습니다.");
        }
      });
    } else {
      axios.post("/api/label", body).then((response) => {
        if (response.data.success) {
          alert("성공적으로 라벨을 추가했습니다.");
          props.refreshFunction();
          toggleLabelEditArea();
        } else {
          alert("라벨 추가에 실패했습니다.");
        }
      });
    }
  };

  const randomColorGetter = () => {
    const randColor = getRandomColor();
    setLabelColor(randColor);
  };

  const Sty = IsEdit ? AddStyle : EditStyle;

  return (
    <Sty.TopDiv
      className={IsEdit ? "labelEditInputContainer" : "labelAddInputContainer"}
    >
      <Sty.LabelPreviewContainerStyle className="labelPreviewContainer">
        <div className="labelPreview">
          <LabelTag labelName={LabelName} color={LabelColor} />
        </div>
      </Sty.LabelPreviewContainerStyle>
      <Sty.LabelInfoInputContainerStyle className="labelInfoInputContainer">
        <Sty.LabelInfoInputFormStyle
          onSubmit={submitHandler}
          className="labelInfoInputForm"
        >
          <Sty.LabelNameInputContainerStyle className="labelNameInputContainer">
            <label>Label name</label>
            <Sty.InputInLabelNameInputContainerStyle
              onChange={labelNameChangeHandler}
              value={LabelName}
              placeholder="Label name"
            />
          </Sty.LabelNameInputContainerStyle>
          <Sty.LabelDescriptionInputContainerStyle className="labelDescriptionInputContainer">
            <label>Description</label>
            <Sty.InputInLabelDescriptionInputContainerStyle
              onChange={labelDescriptionChangeHandler}
              value={LabelDescription}
              placeholder="Description (optional)"
            />
          </Sty.LabelDescriptionInputContainerStyle>
          <Sty.LabelColorInputContainerStyle className="labelColorInputContainer">
            <label>Color</label>
            <Sty.LabelColorInputStyle className="labelColorInput">
              <Sty.RandomLabelColorButtonStyle
                className="randomLabelColorButton"
                onClick={randomColorGetter}
              >
                <img src="https://img.icons8.com/android/13/000000/refresh.png" />
              </Sty.RandomLabelColorButtonStyle>
              <Sty.InputInLabelColorInputStyle
                onChange={labelColorChangeHandler}
                value={LabelColor}
              />
            </Sty.LabelColorInputStyle>
          </Sty.LabelColorInputContainerStyle>
          <Sty.LabelButtonInputContainerStyle className="labelButtonInputContainer">
            <Sty.LabelCancelButtonStyle
              onClick={IsEdit ? props.setEditing : toggleLabelEditArea}
              className="labelCancelButton"
            >
              Cancel
            </Sty.LabelCancelButtonStyle>
            <Sty.LabelCreateButtonStyle
              type="submit"
              className="labelCreateButton"
              disabled={!LabelName}
            >
              {IsEdit ? "Save changes" : "Create label"}
            </Sty.LabelCreateButtonStyle>
          </Sty.LabelButtonInputContainerStyle>
        </Sty.LabelInfoInputFormStyle>
      </Sty.LabelInfoInputContainerStyle>
    </Sty.TopDiv>
  );
}

export default LabelEditArea;
