import React, { useContext } from "react";
import { LandingPageContext } from "../../views/LandingPage";
import styled from "styled-components";
// import "./style.css";

function CustomInput(props) {
  const { inputData, inputOnChangeHandler, inputSubmitHandler } = useContext(
    LandingPageContext
  );

  return (
    <FilterInputFormStyle id="filterInput">
      <CustomInputStyle
        type="text"
        className="custom__input"
        value={inputData}
        onChange={inputOnChangeHandler}
        onKeyPress={inputSubmitHandler}
        placeholder={"Search all issues"}
      />
    </FilterInputFormStyle>
  );
}

const FilterInputFormStyle = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const CustomInputStyle = styled.input`
  height: 30px;
  border-radius: 0 6px 6px 0;
  border: 1px solid #e1e4e8;
  border-left: 0;
  background-color: #fafbfc;
`;

export default CustomInput;
