import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <HeaderDiv id="headerArea">
      <Top>
        <Imogi href='/'>&#128008; &nbsp;</Imogi>
        <HeaderTitleLink href='/'>ISSUES</HeaderTitleLink>
      </Top>
    </HeaderDiv>
  );
}

const HeaderDiv = styled.div`
  background-color: black;
`;

const Top = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: space-around;
  background-color: black;
  color: white;
  font-size: 9px;
  padding: 0.5%;
  transition: 0.4s;
  :hover {
    opacity: 0.7;
    transition: 0.4s;
  }
`;

const HeaderTitleLink = styled.a`
  color: white;
  :hover {
    text-decoration:none;
    color: white;
  }
`;

const Imogi = styled.a`
  font-size: 15px;
  margin: 0;
  :hover {
    text-decoration:none;
    color: white;
  }
`;

export default Header;
