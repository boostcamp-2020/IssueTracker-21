import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import gear16 from "@iconify/icons-octicon/gear-16";
import DropDown from "../DropDown";
import MilestoneSideCard from "../MilestoneSideCard";
import { NewIssuePageContext } from "../../views/NewIssuePage";
function MilestoneSideItem() {
  const { milestone, milestoneListHandler } = useContext(NewIssuePageContext);
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
      {milestone ? (
        <MilestoneSideCard title={milestone.title} />
      ) : (
        <span>None yet</span>
      )}
    </div>
  );
}

export default MilestoneSideItem;
