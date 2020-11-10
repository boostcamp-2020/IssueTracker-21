import React, { useEffect, useState, useMemo, useContext } from "react";
import CustomBtn from "../CustomBtn";
import { Icon, InlineIcon } from "@iconify/react";
import tagIcon from "@iconify/icons-octicon/tag";
import milestone24 from "@iconify/icons-octicon/milestone-24";
import CustomDropDown from "../CustomDropDown";
import CustomInput from "../CustomInput";
import { LabelPageContext } from "../../views/LabelPage/LabelPage";

import "./style.scss";

function LabelNavBar() {
  const {toggleLabelEditArea} = useContext(LabelPageContext);

  return (
  <div className="labelNavBarContainer">
    <div className="linkButtonContainer"></div>
    <div className="newLabelButtonContainer">
      <button className="newLabelButton" onClick={toggleLabelEditArea}>New label</button>
    </div>
  </div>
  );
}

export default LabelNavBar;

