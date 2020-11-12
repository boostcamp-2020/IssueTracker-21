import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import gear16 from "@iconify/icons-octicon/gear-16";
import DropDown from "../DropDown";
import MilestoneSideCard from "../MilestoneSideCard";
import styled from "styled-components";
import { SidebarContext } from "../Sidebar";
function MilestoneSideItem() {
  const { curMilestone, milestoneListHandler } = useContext(SidebarContext);
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
        Milestones <Icon icon={gear16} />
      </SideItemButton>
      {DropdownStatus ? (
        <DropDown
          filter="milestone"
          handler={dropDownHandler}
          status={DropdownStatus}
          onCardClicked={milestoneListHandler}
        />
      ) : null}
      {curMilestone ? (
        <MilestoneSideCard title={curMilestone.title} />
      ) : (
        <span>None yet</span>
      )}
    </SideItemContainer>
  );
}


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

export default MilestoneSideItem;
