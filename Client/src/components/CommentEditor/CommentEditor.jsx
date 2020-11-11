import React, { useState } from "react";
import Editor from "../Editor";
import styled from "styled-components";

function CommentEditor(props) {
  const cancelClickHandler = props.cancelClickHandler;
  const submitClickHandler = props.submitClickHandler;
  const defaultValue = props.defaultValue;

  const [typed, setTyped] = useState(defaultValue);

  const typingHandler = (value) => {
    setTyped(value);
  };

  return (
    <div>
      <Editor
        typingHandler={typingHandler}
        defaultValue={defaultValue}
      ></Editor>
      <CommentButtons id="commentButtonArea">
        <CancelStyle className="cancel" onClick={(e) => cancelClickHandler(e)}>
          Cancel
        </CancelStyle>
        <UpdateStyle
          className="update"
          onClick={() => submitClickHandler(typed)}
        >
          Update comment
        </UpdateStyle>
      </CommentButtons>
    </div>
  );
}

const CommentButtons = styled.div`
  display: flex;
  width: 100%;
  justify-items: flex-end;
  align-items: center;
`;

const BtnStyle = styled.button`
  border-radius: 2.5px;
  font-weight: bold;
  margin: 0 1%;
  border: 1px solid #777777;
`;
const CancelStyle = styled(BtnStyle)`
  background-color: #fafbfc;
  color: red;
`;
const UpdateStyle = styled(BtnStyle)`
  background-color: #2cbe4e;
  color: white;
`;

export default CommentEditor;
