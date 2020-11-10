import React, { useState } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import gear16 from "@iconify/icons-octicon/gear-16";
import DropDown from "../DropDown";
import toggleArray from "../../utils/toggleArray";
import AsigneeSideCard from "../AssigneeSideCard";

function AssigneeSideItem() {
  const [DropdownStatus, setDropdownStatus] = useState(false);
  const [assigneeList, setAssigneeList] = useState([]);

  const assigneeListHandler = (data) => {
    setAssigneeList(toggleArray(assigneeList, data));
  };

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
        Asignee <Icon icon={gear16} />
      </button>
      {DropdownStatus ? (
        <DropDown
          filter="assignee"
          handler={dropDownHandler}
          status={DropdownStatus}
          onCardClicked={assigneeListHandler}
        />
      ) : null}
      {assigneeList.map((element) => {
        return <AsigneeSideCard id={element.id} profile={element.profile} />;
      })}
    </div>
  );
}

export default AssigneeSideItem;
