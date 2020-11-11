import React from "react";
import CustomBtn from "../CustomBtn";

function CancelMilestoneBtn(props) {
  const cancelHandler = props.cancelHandler;
  return (
    <CustomBtn
      color="black"
      bgColor="#fafbfc"
      width="12%"
      height="26px"
      border="1px solid #e1e4e8"
      outline="none"
      borderRad="2.5px"
      padding="1%"
      onClick={cancelHandler}
    >
      Cancel
    </CustomBtn>
  );
}

export default CancelMilestoneBtn;
