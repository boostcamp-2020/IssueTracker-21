import React, { useState, useContext } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import gear16 from "@iconify/icons-octicon/gear-16";
import DropDown from "../DropDown";
import AsigneeSideCard from "../AssigneeSideCard";
import { SidebarContext } from "../Sidebar";

function AssigneeSideItem() {
  const { assigneeListHandler, curAssigneeList } = useContext(SidebarContext);
  const [DropdownStatus, setDropdownStatus] = useState(false);

  const showDropDown = () => {
    if (DropdownStatus) return setDropdownStatus(false);
    setDropdownStatus(true);
  };

  const dropDownHandler = (status) => {
    setDropdownStatus(status);
  };

  return (
    <div>
      <button onClick={showDropDown}>
        Assignee <Icon icon={gear16} />
      </button>
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
        <span>No one-assign yourself</span>
      )}
    </div>
  );
}

export default AssigneeSideItem;
