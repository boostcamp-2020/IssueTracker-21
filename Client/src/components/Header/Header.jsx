import React from "react";
import "./style.scss";
import styled from "styled-components";

const HeaderDiv = styled.div`
  background-color: black;
`;

function Header() {
  return (
    <HeaderDiv id="headerArea">
      <div className="top">
        <p className="imogi">&#128008;</p>
        <h1 className="title">ISSUES</h1>
      </div>
    </HeaderDiv>
  );
}

export default Header;
