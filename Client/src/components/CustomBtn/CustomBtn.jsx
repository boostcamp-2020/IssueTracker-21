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
  font-size: 14px;
  line-height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
`;

export default CustomBtn;
