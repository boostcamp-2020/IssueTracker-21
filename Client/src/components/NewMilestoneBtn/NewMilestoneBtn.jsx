import React from "react";
import CustomBtn from "../CustomBtn";

function NewMilestoneBtn(props) {
  const postNewMilestone = props.postNewMilestone;
  return (
    <CustomBtn
      color="white"
      bgColor="#2cbe4e"
      width="20%"
      height="26px"
      border="none"
      outline="none"
      borderRad="2.5px"
      padding="1%"
      onClick={postNewMilestone}
    >
      {props.value}
    </CustomBtn>
  );
}

export default NewMilestoneBtn;
