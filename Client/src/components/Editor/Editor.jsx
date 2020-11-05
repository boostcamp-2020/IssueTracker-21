import React, { useEffect, useState } from "react";
import styled from "styled-components";

let debounce = null;
let showingDebounce = null;

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
  display: ${(props) => props.display};
`;

function Editor(props) {
  const [CountWord, setCountWord] = useState(0);
  const [Contents, setContents] = useState("");
  const [ShowNum, setShow] = useState("none");

  function typeHandler(e) {
    const text = e.target.value;

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
      <CountWordStyle display="flex" id="countWord">
        {CountWord} characters
      </CountWordStyle>
    </EditorStyle>
  );
}

export default Editor;
