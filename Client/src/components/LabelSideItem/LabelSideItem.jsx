import React, { useState, useContext } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import gear16 from "@iconify/icons-octicon/gear-16";
import DropDown from "../DropDown";
import LabelTag from "../LabelTag";
import { NewIssuePageContext } from "../../views/NewIssuePage";

function LabelSideItem() {
  const { labelList, labelListHandler } = useContext(NewIssuePageContext);
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
      {labelList.length ? (
        labelList.map((element) => {
          console.log(element.color);
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
