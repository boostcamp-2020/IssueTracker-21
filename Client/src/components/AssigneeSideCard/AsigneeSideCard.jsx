import React from "react";
import styled from "styled-components";
const ListPicture = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 4px;
`;

function AsigneeSideCard({ id, profile }) {
  return (
    <div>
      <ListPicture src={profile} />
      <span> {id} </span>
    </div>
  );
}

export default AsigneeSideCard;
