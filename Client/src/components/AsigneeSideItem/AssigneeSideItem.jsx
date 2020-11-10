import React, { useState, useContext } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import gear16 from "@iconify/icons-octicon/gear-16";
import DropDown from "../DropDown";
import AsigneeSideCard from "../AssigneeSideCard";
import { NewIssuePageContext } from "../../views/NewIssuePage";

function AssigneeSideItem() {
  const { assigneeList, assigneeListHandler } = useContext(NewIssuePageContext);
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
      {assigneeList.length ? (
        assigneeList.map((element) => {
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
