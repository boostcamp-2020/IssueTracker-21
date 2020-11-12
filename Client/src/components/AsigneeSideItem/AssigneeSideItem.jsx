import React, { useState, useContext } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import gear16 from "@iconify/icons-octicon/gear-16";
import DropDown from "../DropDown";
import AsigneeSideCard from "../AssigneeSideCard";
import styled from "styled-components";
import { SidebarContext } from "../Sidebar";

function AssigneeSideItem() {
  const { assigneeListHandler, curAssigneeList, assignMeHandler } = useContext(
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
        Assignees <Icon icon={gear16} />
      </SideItemButton>
      {DropdownStatus ? (
        <DropDown
          filter="assignee"
          handler={dropDownHandler}
          status={DropdownStatus}
          onCardClicked={assigneeListHandler}
        />
      ) : null}
      {curAssigneeList.length ? (
        curAssigneeList.map((element) => {
          return (
            <AsigneeSideCard
              key={element.id}
              id={element.id}
              profile={element.profile}
            />
          );
        })
      ) : (
        <AssignMeArea>
          No one-
          <SideItemButton onClick={assignMeHandler}>yourself</SideItemButton>
        </AssignMeArea>
      )}
    </SideItemContainer>
  );
}

const AssignMeArea = styled.div`
  display: flex;
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
export default AssigneeSideItem;
