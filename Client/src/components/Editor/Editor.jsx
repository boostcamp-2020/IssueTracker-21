import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

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
`;

const CountWordStyle = styled.div`
  color: #888889;
  position: absolute;
  bottom: 5px;
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

  return (
    <EditorStyle id="writeArea">
      <TextAreaStyle
        vaule={Contents}
        onChange={typeHandler}
        placeholder={props.placeholder || "Leave a text"}
      ></TextAreaStyle>
      <CountWordStyle active={ShowNum} boxFade={boxFade} id="countWord">
        {CountWord} characters
      </CountWordStyle>
    </EditorStyle>
  );
}

export default Editor;
