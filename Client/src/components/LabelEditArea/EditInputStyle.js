import styled from "styled-components";

const TopDiv = styled.div`
  display: flex;
  flex-flow: column;
  background-color: #ffffff00;
  width: 100%;
  *:focus {
    outline: none;
  }
`;

const LabelPreviewContainerStyle = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  margin-bottom: 15px;
`;

const LabelInfoInputContainerStyle = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
`;

const LabelInfoInputFormStyle = styled.form`
  display: flex;
  flex-flow: row;
  width: 100%;
`;

const LabelNameInputContainerStyle = styled.div`
  display: flex;
  flex-flow: column;
  width: 25%;
`;

const InputInLabelNameInputContainerStyle = styled.input`
  height: 1.5rem;
  font-size: 13px;
`;

const LabelDescriptionInputContainerStyle = styled.div`
  display: flex;
  flex-flow: column;
  width: 38%;
`;

const InputInLabelDescriptionInputContainerStyle = styled.input`
  height: 1.5rem;
  font-size: 13px;
`;

const LabelColorInputContainerStyle = styled.div`
  display: flex;
  flex-flow: column;
  width: 12%;
`;

const LabelColorInputStyle = styled.div`
  display: flex;
`;

const RandomLabelColorButtonStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(196, 218, 243);
  border: 1px solid rgb(225, 228, 232);
  border-radius: 2px;
  margin-right: 2px;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 13px;
`;

const InputInLabelColorInputStyle = styled.input`
  height: 1.5rem;
  font-size: 13px;
`;

const LabelButtonInputContainerStyle = styled.div`
  display: flex;
  width: 25%;
  margin-left: 30px;
  padding-top: 1.5rem;
`;

const LabelCancelButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 1.5rem;
  font-size: 13px;
  border: 1px solid rgb(225, 228, 232);
  border-radius: 2px;
  background-color: white;
`;

const LabelCreateButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 1.5rem;
  font-size: 13px;
  border: 1px solid #647c6b;
  border-radius: 2px;
  background-color: #2ea44f;
  color: white;
  margin-left: 2px;

  ${(props) =>
    props.disabled &&
    css`
      background-color: #2ea44f7e;
      border: 1px solid #647c6ba2;
    `};
`;

export default {
  TopDiv,
  LabelPreviewContainerStyle,
  LabelInfoInputContainerStyle,
  LabelInfoInputFormStyle,
  LabelNameInputContainerStyle,
  InputInLabelNameInputContainerStyle,
  LabelDescriptionInputContainerStyle,
  InputInLabelDescriptionInputContainerStyle,
  LabelColorInputContainerStyle,
  LabelColorInputStyle,
  RandomLabelColorButtonStyle,
  InputInLabelColorInputStyle,
  LabelButtonInputContainerStyle,
  LabelCancelButtonStyle,
  LabelCreateButtonStyle,
};
