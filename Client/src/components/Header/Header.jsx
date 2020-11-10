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
        <div className="imogi">&#128008; &nbsp;</div>
        <div className="headerTitle">ISSUES</div>
      </div>
    </HeaderDiv>
  );
}

export default Header;
