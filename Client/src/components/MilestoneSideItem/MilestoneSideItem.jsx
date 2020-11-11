import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import gear16 from "@iconify/icons-octicon/gear-16";
import DropDown from "../DropDown";
import MilestoneSideCard from "../MilestoneSideCard";
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
    <div>
      <button onClick={showDropDown}>
        Milestones <Icon icon={gear16} />
      </button>
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
    </div>
  );
}

export default MilestoneSideItem;
