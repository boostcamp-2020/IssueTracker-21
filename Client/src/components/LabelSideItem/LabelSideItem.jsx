import React, { useState, useContext } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import gear16 from "@iconify/icons-octicon/gear-16";
import DropDown from "../DropDown";
import LabelTag from "../LabelTag";
import { SidebarContext } from "../Sidebar";
import axios from "axios";

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
    <div>
      <button onClick={showDropDown}>
        Labels <Icon icon={gear16} />
      </button>
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
    </div>
  );
}

export default LabelSideItem;
