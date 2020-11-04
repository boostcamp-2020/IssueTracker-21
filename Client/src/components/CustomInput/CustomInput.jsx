import React, { useEffect, useState, useMemo } from "react";
import "./style.css";

function CustomInput(props) {
  const { filter, inputChangeHandler } = props;

  const [Keyword, setKeyword] = useState("");

  const keywordChange = useMemo(() => {
    //inputChangeHandler(Keyword + filter);
    setKeyword(Keyword + filter);
  }, [filter]);

  useEffect(() => {
    setKeyword(filter);
  }, []);

  function onChangeInputHandler(e) {
    inputChangeHandler(e.target.value);
    setKeyword(e.target.value);
  }

  return (
    <form id="filterInput">
      <input
        type="text"
        className="custom__input"
        value={Keyword}
        onChange={onChangeInputHandler}
      />
    </form>
  );
}

export default CustomInput;
