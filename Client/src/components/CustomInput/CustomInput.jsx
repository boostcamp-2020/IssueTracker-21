import React, { useEffect, useState, useMemo } from "react";
import "./style.css";

function CustomInput(props) {
  const { filter } = props;

  const [Keyword, setKeyword] = useState("");

  const keywordChange = useMemo(() => setKeyword(Keyword + filter), [filter]);

  useEffect(() => {
    setKeyword(filter);
  }, []);

  function inputHandler(e) {
    setKeyword(e.target.value);
  }

  return (
    <form id="filterInput">
      <input
        type="text"
        className="custom__input"
        value={Keyword}
        // onKeyPress={inputHandler}
        onChange={inputHandler}
      />
    </form>
  );
}

export default CustomInput;
