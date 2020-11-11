import React from "react";
import CustomBtn from "../CustomBtn";

function MilestoneStatusBtn(props) {
  const statusHandler = props.statusHandler;
  return (
    <CustomBtn
      color="black"
      bgColor="#fafbfc"
      width="22%"
      height="26px"
      border="1px solid #e1e4e8"
      outline="none"
      borderRad="2.5px"
      padding="1%"
      onClick={statusHandler}
    >
      {props.value}
    </CustomBtn>
  );
}

export default MilestoneStatusBtn;
