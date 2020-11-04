import styled from "styled-components";

const CustomBtn = styled.button`
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  outline: ${(props) => props.outline};
  border-radius: ${(props) => props.borderRad};
  padding: ${(props) => props.padding};
  display: flex;
  align-items: center;
  box-sizing: border-box;
  text-align: right;
`;

export default CustomBtn;
