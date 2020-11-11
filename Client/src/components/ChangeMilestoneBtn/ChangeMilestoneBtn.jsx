import React from "react";
import CustomBtn from "../CustomBtn";

function ChangeMilestoneBtn(props) {
  const putNewMilestone = props.putNewMilestone;
  return (
    <CustomBtn
      color="white"
      bgColor="#2cbe4e"
      width="18%"
      height="26px"
      border="none"
      outline="none"
      borderRad="2.5px"
      padding="1%"
      onClick={putNewMilestone}
    >
      {props.value}
    </CustomBtn>
  );
}

export default ChangeMilestoneBtn;
