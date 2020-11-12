import React, { useState, useContext } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import gear16 from "@iconify/icons-octicon/gear-16";
import DropDown from "../DropDown";
import LabelTag from "../LabelTag";
import { SidebarContext } from "../Sidebar";
import styled from "styled-components";

function LabelSideItem() {
  const { curLabelList, labelListHandler, issueID } = useContext(
    SidebarContext
  );
  const [DropdownStatus, setDropdownStatus] = useState(false);

  const showDropDown = () => {
    if (DropdownStatus) return setDropdownStatus(false);
    setDropdownStatus(true);
  };

  const dropDownHandler = (status) => {
    setDropdownStatus(status);
  };
  return (
    <SideItemContainer>
      <SideItemButton onClick={showDropDown}>
        Labels <Icon icon={gear16} />
      </SideItemButton>
      <ContentsArea id="contentsArea">
        {DropdownStatus ? (
          <DropDown
            filter="label"
            handler={dropDownHandler}
            status={DropdownStatus}
            onCardClicked={labelListHandler}
          />
        ) : null}
        {curLabelList.length ? (
          curLabelList.map((element) => {
            return (
              <LabelTag
                key={element.id}
                labelName={element.name}
                color={element.color}
              />
            );
          })
        ) : (
          <span>None yet</span>
        )}
      </ContentsArea>
    </SideItemContainer>
  );
}

const ContentsArea = styled.div`
  display: flex;
  flex-direction: row;
`;

const SideItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideItemButton = styled.button`
  &:hover {
    color: #0366d6;
  }
  color: #586069;
  display: flex;
  justify-content: space-between;
  border: none;
  background-color: white;
  padding: 0px;
`;

export default LabelSideItem;
