import React from "react";
import CustomBtn from "../../components/CustomBtn";
import { Icon, InlineIcon } from "@iconify/react";
import tagIcon from "@iconify/icons-octicon/tag";
import milestone24 from "@iconify/icons-octicon/milestone-24";
import CustomDropDown from "../../components/CustomDropDown";
import CustomInput from "../../components/CustomInput";
import "./style.css";
function Navbar() {
  return (
    <div className="customNavbar">
      <div className="filter__section">
        <CustomDropDown />
        <CustomInput />
      </div>
      <div className="button__section">
        <CustomBtn
          color="black"
          bgColor="white"
          width="150px"
          height="30px"
          border="1px solid #e1e4e8"
          borderRad="6px"
          padding="5px 16px"
        >
          <Icon width="25" height="25" icon={tagIcon} />
          Labels
        </CustomBtn>

        <CustomBtn
          color="black"
          bgColor="white"
          width="180px"
          height="30px"
          border="1px solid #e1e4e8"
          borderRad="6px"
          padding="5px 16px"
        >
          <Icon width="25" height="25" icon={milestone24} />
          Milestones
        </CustomBtn>
      </div>
      <CustomBtn
        color="white"
        bgColor="#2ea44f"
        width="100px"
        borderRad="6px"
        height="30px"
        border="0"
      >
        New issue
      </CustomBtn>
    </div>
  );
}

export default Navbar;
