import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { keyframes, css } from "styled-components";
import NewImage from "../../utils/uploadImgur";

let debounce = null;

const boxFade = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }`;

const EditorStyle = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TextAreaStyle = styled.textarea`
  width: 100%;
  min-height: 150px;
  display: flex;
  background-color: #fafbfc;
  border: 1px solid #ced2d7;
  border-style: solid solid dashed;
  border-radius: 4px 4px 0 0;
`;

const CountWordStyle = styled.div`
  color: #888889;
  position: absolute;
  bottom: 40px;
  right: 10px;
  display: block;
  opacity: 0%;
  ${(props) =>
    props.active &&
    css`
      animation: 2s linear ${boxFade};
      animation-direction: alternate;
    `}
`;

const InputFileLabelStyle = styled.label`
  cursor: pointer;
  width: 100%;
  font-size: 13px;
  font-weight: 400;
  padding: 2px 10px;
  background-color: #fafbfc;
  border: 1px solid #ced2d7;
  border-top: 0;
  border-radius: 0 0 4px 4px;
`;

const InputFileStyle = styled.input`
  display: none;
`;

function Editor(props) {
  const [CountWord, setCountWord] = useState(0);
  const [Contents, setContents] = useState("");
  const [ShowNum, setShowNum] = useState(false);

  function typeHandler(e) {
    const text = e.target.value;

    // debounce
    clearTimeout(debounce);
    setShowNum(false);
    debounce = setTimeout(() => {
      setShowNum(true);
    }, 2000);

    setCountWord(text.length);
    setContents(text);
  }

  function uploadImage(e) {
    try {
      NewImage(e, Contents, setContents);
    } catch (e) {
      alert("이미지 업로드에 실패했습니다.");
    }
  }

  return (
    <EditorStyle id="writeArea">
      <TextAreaStyle onChange={typeHandler} value={Contents} />
      <CountWordStyle active={ShowNum} boxFade={boxFade} id="countWord">
        {CountWord} characters
      </CountWordStyle>
      <InputFileLabelStyle className="inputFileButton" htmlFor="inputFile">
        Attach files by selecting here
      </InputFileLabelStyle>
      <InputFileStyle
        id="inputFile"
        type="file"
        accept="image/jpeg, image/jpg, image/png" //업로드 가능한 파일 종류.
        onChange={uploadImage}
      />
    </EditorStyle>
  );
}

export default Editor;
