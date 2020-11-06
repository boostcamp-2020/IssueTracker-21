import React, { useEffect, useState, useMemo, useContext } from "react";
import { LandingPageContext } from "../../views/LandingPage"
import "./style.css";

function CustomInput(props) {

  const { inputData, inputOnChangeHandler } = useContext(LandingPageContext);
  
  return (
    <form id="filterInput">
      <input
        type="text"
        className="custom__input"
        value={inputData}
        onChange={inputOnChangeHandler}
      />
    </form>
  );
}

export default CustomInput;
