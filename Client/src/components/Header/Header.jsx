import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Header() {
  return (
    <HeaderDiv id="headerArea">
      <Link to="/">
        <Top>
          <Imogi>&#128008; &nbsp;</Imogi>
          <HeaderTitleLink>이슈잇슈</HeaderTitleLink>
        </Top>
      </Link>
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

const HeaderTitleLink = styled.div`
  color: white;
  :hover {
    text-decoration: none;
    color: white;
  }
`;

const Imogi = styled.div`
  font-size: 15px;
  margin: 0;
  :hover {
    text-decoration: none;
    color: white;
  }
`;

export default Header;
