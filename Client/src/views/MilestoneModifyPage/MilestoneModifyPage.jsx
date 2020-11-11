import React, { useState } from "react";
import axios from "axios";

import ChangeMilestoneBtn from "../../components/ChangeMilestoneBtn";
import CancelMilestoneBtn from "../../components/CancelMilestoneBtn";
import MilestoneEditor from "../../components/MilestoneEditor";
import MilestoneStatusBtn from "../../components/MilestoneStatusBtn";
import { Icon, InlineIcon } from "@iconify/react";
import CustomBtn from "../../components/CustomBtn";
import tagIcon from "@iconify/icons-octicon/tag";
import milestone24 from "@iconify/icons-octicon/milestone-24";

import styled from "styled-components";

const MilestoneAddArea = styled.div`
  padding: 1% 5%;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TopNavStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 60px;
`;

function MilestoneModifyPage(props) {
  const milestoneId = props.match.params.milestoneId;
  const [title, setTitle] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);

  function labelsHandler() {
    props.history.push("/labels");
  }

  function milestonesHandler() {
    props.history.push("/milestone");
  }

  function cancelHandler() {
    props.history.push("/milestone");
  }

  function statusHandler() {
    console.log("상태변경 추가");
  }

  const titleHandler = (value) => {
    setTitle(value);
  };

  const dueDateHandler = (value) => {
    setDueDate(value);
  };

  const descriptionHandler = (value) => {
    setDescription(value);
  };

  const putNewMilestone = () => {
    if (title == null || title == "") {
      alert("Title을 입력하세요");
      return;
    }
    let data = {
      milestoneId: milestoneId,
      title: title,
      dueDate: dueDate,
      description: description,
    };
    axios
      .put("/api/milestone", data, {
        "Content-Type": "application/json",
        withCredentials: true,
        credentials: "include",
      })
      .then((response) => {
        if (response.data.success) {
          props.history.push("/milestone");
        } else {
          console.log(response);
        }
      });
  };

  return (
    <MilestoneAddArea>
      <TopNavStyle id="topNav">
        <div className="button__section">
          <CustomBtn
            color="black"
            bgColor="white"
            width="100%"
            height="30px"
            border="1px solid #e1e4e8"
            borderRad="6px 0 0 6px"
            padding="5px 13px"
            onClick={labelsHandler}
          >
            <Icon width="18" height="18" icon={tagIcon} />
            &nbsp;Labels
          </CustomBtn>

          <CustomBtn
            color="white"
            bgColor="#0E66D6"
            width="100%"
            height="30px"
            border="1px solid #e1e4e8"
            borderRad="0 6px 6px 0"
            padding="5px 13px"
            onClick={milestonesHandler}
          >
            <Icon width="18" height="18" icon={milestone24} />
            &nbsp;Milestones
          </CustomBtn>
        </div>
      </TopNavStyle>
      <hr />
      <MilestoneEditor
        titleHandler={titleHandler}
        dueDateHandler={dueDateHandler}
        descriptionHandler={descriptionHandler}
      />
      <hr />
      <ButtonArea>
        <CancelMilestoneBtn cancelHandler={cancelHandler} />
        <MilestoneStatusBtn
          statusHandler={statusHandler}
          value={status ? "Close milestone" : "Reopen milestone"}
        />
        <ChangeMilestoneBtn
          value="Save changes"
          putNewMilestone={putNewMilestone}
        />
      </ButtonArea>
    </MilestoneAddArea>
  );
}

export default MilestoneModifyPage;
