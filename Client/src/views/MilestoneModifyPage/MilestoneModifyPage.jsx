import React, { useState } from "react";
import axios from "axios";

import NewMilestoneHeader from "../../components/NewMilestoneHeader";
import NewMilestoneBtn from "../../components/NewMilestoneBtn";
import MilestoneEditor from "../../components/MilestoneEditor";

import styled from "styled-components";

const MilestoneAddArea = styled.div`
  padding: 1% 5%;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function MilestoneModifyPage(props) {
  const milestoneId = props.match.params.milestoneId;
  const [title, setTitle] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [description, setDescription] = useState("");

  const titleHandler = (value) => {
    setTitle(value);
  };

  const dueDateHandler = (value) => {
    setDueDate(value);
  };

  const descriptionHandler = (value) => {
    setDescription(value);
  };

  const postNewMilestone = () => {
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
      .put("api/milestone", data, {
        "Content-Type": "application/json",
        withCredentials: true,
        credentials: "include",
      })
      .then((response) => {
        if (response.success) {
          console.log("성공");
        } else {
          console.log(response);
        }
      });
  };

  return (
    <MilestoneAddArea>
      <NewMilestoneHeader />
      <hr />
      <MilestoneEditor
        titleHandler={titleHandler}
        dueDateHandler={dueDateHandler}
        descriptionHandler={descriptionHandler}
      />
      <hr />
      <ButtonArea>
        <NewMilestoneBtn
          value="Create milestone"
          postNewMilestone={postNewMilestone}
        />
      </ButtonArea>
    </MilestoneAddArea>
  );
}

export default MilestoneModifyPage;
